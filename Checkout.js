import React from 'react'
import "./Checkout.css"
import Subtotal from './Subtotal'
import { useStatevalue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';


function Checkout() {
    const [{basket,user} , dispatch] = useStatevalue();
    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img className='checkout_ad' src='https://images-eu.ssl-images-amazon.com/images/G/31/IN-Events/Arundhati/J24_FGS_Stripe_PC.png'/>

                <div>
                    <h3>Hello,{user?.email}</h3>
                    <h2 className='checkout_title'>Your Shopping Basket</h2>
                        {basket.map(item=>( item?(
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating} />
                        ):null))}
                </div>
            </div>

            <div className='checkout_right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
