import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name,setname]= useState('');
    const [email,setemail]= useState('');
    const [password,setpassword]= useState('');
     async function registerUser(ev){
         ev.preventDefault();
try{ await axios.post('/register',{
        name,
        email,
        password,
      });
      alert('Registration is Done.you can login');}
      catch(e){
        alert('Registration is Failed,email already used');
      }
     
}


return(
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-60">
        <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>

        <input type="text" 
           placeholder="aya bgh" 
           value={name} 
           onChange={ev =>setname(ev.target.value)} />

        <input type="email" 
           placeholder="your@email.com" className="mt-1"
           value={email}
           onChange={ev =>setemail(ev.target.value)}/>

        <input type="password" 
           placeholder="password" 
           value={password} 
           onChange={ev =>setpassword(ev.target.value)}
        />

        <button className="primary ">Register</button>
        <div className="text-center py-2 text-gray-500">
            Already a member?   
            <Link className="underline text-black" to={'/login'}> Login</Link>
        </div>
    </form>
        </div>
       
</div>
);
}