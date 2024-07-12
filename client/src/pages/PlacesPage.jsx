import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";


export default function PlacesPage() {
    const {action}=useParams();
    const [title,settitle]=useState('');
    const [address,setddress]=useState('');
    const [photos,setphotos]=useState([]);
    const [photosLink,setphotosLink]=useState('');
    const [description,setdescription]=useState('');
    const [perks,setperks]=useState([]);
    const [extra,setextra]=useState('');
    const [checkin,setcheckin]=useState('');
    const [checkout,setcheckout]=useState('');
    const [maxguest,,setmaxguest]=useState(1);
    //----------------------------------------
    function inputheader(text){
        return(
            <h2 className="font-semibold text-2xl mt-4 ">{text}</h2>
        );}

    //------------------------------------------------
    function inputparagraphe(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );}
    //------------------------------------------------------
    function input_output(header,description){
       
       return(
       <>
        {inputheader(header)}
        {inputparagraphe(description)}
        </>);
    }
    //---------------------------------------------------
    async function addphotoLink(ev){
        ev.preventDefault();
        const {data:filename}=await  axios.post('http://localhost:4000/upload-by-link',{link: photosLink});
        setphotos(prev=>{
            return[...prev,filename];
        });
        setphotosLink('');
    }
    //---------------------------------------------------
     

    //--------------------------------
    function uploadphoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
        }
        axios.post('/uploads', data, {
          headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
          const {data:filenames} = response;
          setphotos(prev => {
            return [...prev, ...filenames];
          });
        })
      }
    //---------------------------------------------------


    return(
    <div>
        {action !== 'new' && (
             <div className="text-center">
              <Link className="font-semibold inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
               </svg> 
               Add new place</Link>
            </div>
        )}
        {action === 'new'&& (
            <div>
            <form >
                {input_output('Title','Title for your house')}
               <input type="text" value={title} onChange={ev=>settitle(ev.target.value)} placeholder="Title : summer appartement"/>


               {input_output('Address','Address of your house')}
                <input type="text" value={address} onChange={ev=>setddress(ev.target.value)} placeholder="Address :  algeria"/>


                {input_output('Photo','a PICs for your house')}
                <div className="flex gap-2 ">
                    <input type="text"value={photosLink} onChange={ev=>setphotosLink(ev.target.value)} placeholder={"add using a link.........jpg"} />
                    <button onClick={addphotoLink} className="font-semibold bg-gray-200 px-4 rounded-2xl"> Add Photo</button>
                </div>

                <div className="grid grid-cols-3 md-grid-cols-4 lg:grid-cols-6 mt-3">
  {/* --------------------------------------------------------------------------------------------------- */}
                    {photos.length > 0 && photos.map((link=>(
                    <div>
                        <img src={"http://localhost:4000/"+link} />
                   </div>
                      )))}
 {/* --------------------------------------------------------------------------------------------------- */}
                       
                   <label className="cursor-pointer gap-1 justify-center flex border bg-transparent rounded-2xl p-8 text-2xl text-gray-700 font-semibold" >Upload
                   <input type="file" multiple className="hidden" onChange={uploadphoto} />

                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                      </svg>
                   </label>
                </div>


                {input_output('Description','describe your place')}
                <textarea className=""rows={6} value={description} onChange={ev=>setdescription(ev.target.value)} />


                {input_output('Perks','select all the perks of your place')}
                 <div className="  grid mt-3 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setperks} />
                </div>


                {input_output('Check IN/OUT','at what time you should come and leave ..')}
               <div className="grid sm:grid-col-3 lg:grid-cols-4 gap-10">
               <div >
                    <h3 className="mt-2 -mb-1">Check IN Time</h3>
                    <input type="text" placeholder="08:00 AM" value={checkin} onChange={ev=>setcheckin(ev.target.value)} />
                </div>
               <div>               
                   <h3 className="mt-2 -mb-1">Check OUT Time</h3>
                    <input type="text" placeholder="16:00 PM"value={checkout} onChange={ev=>setcheckout(ev.target.value)} />
                    </div>
               <div>              
                 <h3 className="mt-2 -mb-1">MAX guests</h3>
                 <input type="text" placeholder="4 guests" value={maxguest} onChange={ev=>setmaxguest(ev.target.value)}/>
                </div>
               </div>


               {input_output('Extra Information','House roles,information about neighbours..')}
                 <textarea rows={3} value={extra} onChange={ev=>setextra(ev.target.value)}/>
             
                <button className="primary my-4">Save</button>
              
            </form>
            </div>
        )}


            
        </div>
    )
}