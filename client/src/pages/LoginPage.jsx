import axios from "axios";
import {  useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
const[email,setemail]=useState('');
const[password,setpassword]=useState('');
const[redirect,setredirect]=useState(false);
const {setUser}=useContext(UserContext);
async function loginsubmit(ev){
    ev.preventDefault();
    try{
        const {data} = await  axios.post('/login',{email,password});
        setUser(data);
        alert('login successful');
        setredirect(true);
    }catch(e){alert('login failed');}
  
}

   if(redirect){
    return<Navigate to={'/'}/>
   }

    return(
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-60">
        <h1 className=" text-4xl text-center mb-4">Login</h1>
    <form className="max-w-md mx-auto " onSubmit={loginsubmit}>
        <input type="email" placeholder="your@email.com" className="mt-1"
        value={email} onChange={ev =>setemail(ev.target.value)}/>
        <input type="password" placeholder="password" 
        value={password} onChange={ev =>setpassword(ev.target.value)} />
        <button className="primary ">Login</button>
        <div className=" text-center py-2 text-gray-500">
            Don't have an account yet?  
            <Link className=" font-semibold underline text-black" to={'/register'}>Register now</Link>
        </div>
    </form>
        </div>
       
</div>
);
}