import React from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './Gallery.css';
const Gallery = ()=>{
const history = useHistory();
var [imageUrl,imageUrlhandler]=useState([]);

const imageretrive=async()=>{
        var form_data=new FormData();
        form_data.append('email',localStorage.getItem('email'));
        const getimageurls = await axios({
        url:
          "http://localhost/Sureify_tasks/gallery/php/getimages.php",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: form_data,
       
      });
      imageUrlhandler(getimageurls.data.urls);
    }
       
const logout =()=>{
    localStorage.removeItem('email');
    history.push('/login');
}
const imagegallery =()=>{
    history.push('view');
}
const categories = ()=>{
    history.push('/categories');
}
const upload =()=>{
    history.push('/upload');
}
const deleteimage=(e,ext)=>{

}
useEffect(() => {
    imageretrive();
  }, []);
    return (
        <div  >
        <div >
          <ul className="navbar_ul">
            <li className="navbar_li"><a href="#"  onClick={imagegallery}><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
            <li className="navbar_li"><a  href="#" onClick={upload} >Upload</a></li>
            <li className="navbar_li"><a  href="#" className="navbar_active"  >Gallery</a></li>
            <li className="navbar_li"><a  href="#" onClick={categories} >Categories</a></li>
            
            <li style={{float:"right"}} className="navbar_li"><a  href="#" onClick={logout} >Logout</a></li>
          </ul>
        </div>
        <div className="image-card">
            {
            imageUrl.length > 0 ?
               imageUrl.map((url,index)=>(
                <div className="Image">
                    <img src={`data:image/${url.extention};base64,${url.imagedata}`} className="photo" alt="image" />
                    <button className="image_deletebutton" id={url.sno} onClick={(e) =>{
                      deleteimage(e,url.extention)
                    }}>Delete</button>
                </div>
            ))
            :
            <h3 style={{color:"red",text_align:"center"}}>Please Add Images to display</h3>
            };
                    
            </div>
        
        </div>
    )



        }

    
export default Gallery;