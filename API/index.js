const express= require('express');
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const usermodel = require('./models/user');
const user= require('./models/user.js');
const bcrypt=require('bcryptjs');
const jsonwebtoken=require('jsonwebtoken');
require('dotenv').config()
const cookieparser =require('cookie-parser');
const app=express();
const bcryptsalt=bcrypt.genSaltSync(10);
const jsonsecret='ayabgh';
const download = require('image-downloader');
const multer = require('multer');
const fs=require('fs')
const path =require('path');
//-----------------------------------
app.use(express.json());
app.use(cookieparser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(
    {credentials:true,
     origin:'http://localhost:5173',
    }
));
//-----------------------------------

//mongo DB
 mongoose.connect('mongodb://localhost:27017/NvacansiDB');
//-----------------------------------
app.get('/test',(req,res)=>{
    res.json('test ok');
});
//-----------------------------------
app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{  const userdoc = await user.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptsalt),//to encript 
    });
    res.json(userdoc);
} catch(e){
    res.status(422).json(e);
}
});
//-----------------------------------
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const userdoc= await user.findOne({email});
   if(userdoc){
    const passOk=bcrypt.compareSync(password,userdoc.password);
    if(passOk){
        jsonwebtoken.sign({
            email:userdoc.email ,
            id:userdoc._id,
            name:userdoc.name},jsonsecret,
             {},
             (err,token)=>{
              if(err) throw err;
              res.cookie('token',token).json(userdoc);

        });
    }else{
        res.json('password not right');
    }
}else{
    res.json('not found');
   }

});
//-----------------------------------
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jsonwebtoken.verify(token,jsonsecret,{},(err,user)=>{
            if(err) throw err;
            res.json(user);
        });
    }else{
        res.json(null);
    }
    res.json({token});
});
//----------------------------------------------------------------------------

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
});

//------------------------------------------------------------------
console.log(__dirname);
app.post('/upload-by-link', async (req,res)=>{
    const {link}= req.body;
    const newName='photo'+ Date.now()+'.jpg';
    await download.image({
        url:link,
        dest:path.join(__dirname, 'uploads', newName),
    });
    res.json( newName);
});
//------------------------------------------------------------------

const phtosmiddleware=multer({dest:'uploads'})
app.post('/uploads', phtosmiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const ext = originalname.split('.').pop();
        const newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.split('/').pop()); // Store only the filename
    }
    res.json(uploadedFiles);
});

//-----------------------------------
const PORT = 4000;
app.listen(PORT, function () {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
  });
