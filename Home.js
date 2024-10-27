import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className='home'>
         <div className='home_container'>
                <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/Jupiter24/Phase2/J24_P2_GW_PC_EventHero_NTA_2x_V2._CB544902773_.jpg'/>
            
            <div className='home_row'>
                <Product id="123456" title="Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage" price={121999} image="https://m.media-amazon.com/images/I/41fCDR6pjpL._SX300_SY300_QL70_FMwebp_.jpg"  rating={5} />
                <Product id="987654" title='Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey' price={59990} image="https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg" rating={4} />
            </div>

            <div className='home_row'>
                <Product id="5678912" title='Apple Watch Ultra 2 GPS + Cellular 49mm Black Titanium Case with Dark Green Alpine Loop - M' price={89900} image="https://m.media-amazon.com/images/I/51uj3UptkdL._SX300_SY300_QL70_FMwebp_.jpg" rating={5} />
                <Product id="6543212" title='Apple iPhone 15 Pro Max (1 TB) - Natural Titanium' price={174900} image="https://m.media-amazon.com/images/I/41037bXz-GL._SY445_SX342_QL70_FMwebp_.jpg" rating={3}/>
                <Product id="7894562" title="Apple iPad Air 11″ (M2): Liquid Retina Display, 128GB, Landscape 12MP Front Camera / 12MP Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Blue" price={57999} image="https://m.media-amazon.com/images/I/415dGcORn2L._SY445_SX342_QL70_FMwebp_.jpg" rating={3}/>
            </div>

            <div className='home_row'>
                 <Product id="1472589" title="Samsung 138 cm (55 inches) QE1D Series 4K Ultra HD QLED Smart TV QA55QE1DAULXL (Black)" price={62990} image="https://m.media-amazon.com/images/I/51quhX+V8DL._SX300_SY300_.jpg" rating={5}/>
            </div>
         </div>
        </div>
    )
}

export default Home
