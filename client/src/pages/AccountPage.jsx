import { useContext ,useState} from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";


export default function Accountpage(){
const{ready,user,setuser}=useContext(UserContext);
const[redirect,setredirect]=useState(null);


let {subpage}=useParams();
if (subpage===undefined){
   subpage='profile';
}
//-------------------------------------------------------------

async function logout(){
   await axios.post('/logout');
   setredirect('/');
   setuser(null);


}

if(!ready){
        return'wait........';
    }
if(ready && !user && !redirect){
        return<Navigate to={'/login'}/>
    }
if(redirect){
        return <Navigate to={redirect}/>
    }
//-------------------------------------------------------------------


    return(
        <div>  
            <AccountNav/>      
       {subpage==='profile' && (
        <div className="text-center max-w-lg mx-auto">
            logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className="font-semibold primary max-w-sm mt-2">Logout</button>
        </div>
       )}

    {subpage==='places' && (
        <PlacesPage />
    )}
        </div>
    );
}