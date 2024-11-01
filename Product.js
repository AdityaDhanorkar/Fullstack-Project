import React from 'react'
import './Product.css'
import { useStatevalue } from './StateProvider'
function Product({id,title ,image,price,rating}) {

    const [{basket}, dispatch] =useStatevalue();
        // console.log("This is the basket",basket);
    const addToBasket=()=>{
        //dispatch item from the data layer
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
            },
        });
    };
    
    return (
        <div className='product'>
            <div className='product_info'>
                <p>{title}</p>
                <p className='produnt_price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_,i)=>(<p>⭐</p>))}    
                </div>
            </div>
            <img src={image}/>
            <button onClick={addToBasket} >Add To Basket</button>
        </div>
    )
}

export default Product
