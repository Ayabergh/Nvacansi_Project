import {createContext, useState,useEffect} from "react";
import axios from 'axios';
import data from "autoprefixer";

export const UserContext = createContext({});
 
export function UserContextProvider({children}){
const [user,setUser]=useState(null);
const[ready,setready]=useState(false);
useEffect(()=>{
if(!user)
axios.get('/profile').then(({data})=>{setUser(data);});
setUser(data);
setready(true);
},[]);

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
      {children}
      </UserContext.Provider>
    );
}







//font-semibold py-2 px-4 bg-primary text-white rounded-full 