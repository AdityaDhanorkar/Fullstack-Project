import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const signIn =e=>{
      e.preventDefault()
      //DO some firebase login
      signInWithEmailAndPassword(auth,email,password).then(auth=>{
        navigate('/');
      })

    }

    const register=e=>{
      e.preventDefault();
      //Do some firebase register
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
          // console.log(userCredential)
          if(auth){
            navigate('/');
          }
        }).catch(error=>alert(error.message));
    }

    return (
        <div className='login'>
          <Link to='/'>
            <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
          </Link>    

          <div className='login_container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e=>setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>

                <p>
                    By Signing-in you agree to the AMZON FAKE CLONE Conditions of Use & Sale.Please see our Privacy Notice,our cookies Notice and our Interest-Based And Notice.
                </p>

                <button onClick={register} className='login_registerButton'>Create Your Amazon Account</button>
          </div>

        </div>
    )
}

export default Login
