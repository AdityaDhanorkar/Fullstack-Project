import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStatevalue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
function Subtotal() {
    const navigate = useNavigate();
    const [{basket} , dispatch] = useStatevalue();
    return (
        <div className='subtotal'>
            <CurrencyFormat 
                renderText={(value)=>(
                    <div>
                      <p>
                        Subtotal ({basket.length} items) :<strong>{value}</strong>
                      </p>
                      <small className='subtotal_gift'>
                        <input type='checkbox'/>This Order Contain Gift 
                      </small>
                     </div>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button onClick={e=>navigate('/payment')} >Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
