import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStatevalue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { doc, setDoc, collection } from "firebase/firestore"; 
function Payment() {

    const[{basket,user},dispatch] = useStatevalue();

    const navigator = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const[suceeded,setSucceded] =useState(false);
    const[processing,setProcessing]=useState(""); 
    const [error ,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    // const [clientSecret,setClientSecret] = useState(true);
    const [clientSecret,setClientSecret] = useState("");

    useEffect(()=>{
            //gnerate the special client secrete that allows us to charge a  customer

            const getClientSecrete = async ()=>{
                const response = await axios({
                    method:'post',
                    //Stripe expect the total in currencies  subunit;
                    url:`/payments/create?total=${getBasketTotal(basket)*100}`
                });
                setClientSecret(response.data.clientSecret)
            } 
            getClientSecrete();
    },[basket])

    console.log('The Secrete is ',clientSecret);
    

    const handleSubmit =async (event) =>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(async ({ paymentIntent }) => {
            // Create a reference to the user's orders collection in Firestore
            // const ordersCollectionRef = collection(db, 'users', user?.uid, 'orders');
            // const ordersCollectionRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);
            const orderRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);

            
            // Add the order details to Firestore
            // await setDoc(doc(ordersCollectionRef, paymentIntent.id), {
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created
            // });
            await setDoc(orderRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });

            setSucceded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            })

            navigator('/orders')
        })
       
    }

    const handleChange=e=>{
        //Listen for change in the cardElement
        //and display any error as the customer type their card datails
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
               
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} item </Link>)
                </h1>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 react lane</p>
                        <p>Pune,Maharastra</p>
                    </div>
                </div>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='paymet_item'>
                        {basket.map(item=>(
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />    
                        ))}
                    </div>
                </div>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onClick={handleSubmit}>
                            <CardElement onChange={handleChange} />
                             <div className='payment_priceContainer'>
                                    <CurrencyFormat 
                                    renderText={(value)=>(
                                        <h3>Order Total :{value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                     />

                                     <button disabled={processing || disabled || suceeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now "}</span>
                                     </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
