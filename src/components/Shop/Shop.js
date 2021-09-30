import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    
    useEffect (() => {
      const saveCard = getDatabaseCart();
      const productKeys = Object.keys(saveCard);
      const previousCart = productKeys.map( existingkey => {
          const product = fakeData.find(pd => pd.key === existingkey);
          product.quantity = saveCard[existingkey];
        //   console.log(existingkey, saveCard[existingkey]);
          return product;
      })
    //   console.log(previousCart);
      setCart(previousCart);
    }, [])

    const handelAddProduct = (product) =>{
        // console.log('Product added', product);
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count ;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
        
    
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                    products.map(product => <Product
                        key = {product.key}
                        showAddToCart = {true}
                        handelAddProduct = {handelAddProduct} 
                         product={product}>
                         </Product>)
                }
               
            
            </div>
           <div className="cart-container">
             <Cart cart={cart}>
                <Link to="/review">
                    <button className="main-button">Review Order</button>
                </Link>

             </Cart>
           </div>
        </div>
    );
};

export default Shop;