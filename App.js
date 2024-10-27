import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router,Switch,Routes,Route} from "react-router-dom";
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStatevalue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from './Orders';

  const promise = loadStripe("pk_test_51QA4UXRty9CXj9c87sW6Qmi7vzeg5MCtt1jWOPn9HDlf0wuB2V7BxwRmXmD0U36A41yfWXZFWY8k6tTYZz4YRkO500cx3DgHpe");

function App() {

   const [{},dispatch] = useStatevalue();
  useEffect(()=>{
      //will only run once when the app component loads...
      auth.onAuthStateChanged(authUser =>{
        console.log('The User is >>>',authUser);

        if(authUser){
          dispatch({
            type:'SET_USER',
            user:authUser
          })
          //the user just logged in /the user was logged in
        }else{
          dispatch({
            type:'SET_USER',
            user:null
          })
          //the user is logged out
        }
      })
  },[])

  return (
    <Router>
      <div className="app">
       <Header />
        <Routes>
          <Route path='orders' element={
            <div>
                <Orders />
            </div>
          }/>
          <Route path='login' element={
            <div>
                <Login />
            </div>
          }/>
          <Route path="/checkout" element={
            <div>
              <Checkout />
            </div>
          } />
          <Route path='/payment' element={
            <div>
              <Elements stripe={promise}>
              <Payment/>
              </Elements>
            </div>
          }  />
          <Route path='/' element={
            <div>
              <Home />
            </div>
          }/>
        </Routes> 
      </div>
   </Router>
  );
}

export default App;
