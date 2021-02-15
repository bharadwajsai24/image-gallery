import React from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './Category.css';
const Category = ()=>{
const history = useHistory();
const [categ,cathandler]=useState([]);
       
const logout =()=>{
    localStorage.removeItem('email');
    history.push('/login');
}
const imagegallery =()=>{
    history.push('view');
}
const gallery = ()=>{
    history.push('/gallery');
}
const upload =()=>{
    history.push('/upload');
}
const deleteimage=(e,ext)=>{

}

const getcategory=async()=>{
        var form_data=new FormData();
        form_data.append('email',localStorage.getItem('email'));
        const tags = await axios({
        url:
          "http://localhost/Sureify_tasks/gallery/php/categories.php",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: form_data,
       
      });
      cathandler(tags.data);
    }


    useEffect(() => {
        getcategory();
      }, [])

      var [imageUrl,imageUrlhandler]=useState([]);

      const onOptionSelected=async(e)=>{
          var val=e.target.value;
          console.log("");
          if(val==="")
          {
              console.log("empty")
              imageUrlhandler([]);
              return ;
          }
              var form_data=new FormData();
              form_data.append('email',localStorage.getItem('email'));
              form_data.append('cat',val);
              const getimageurls = await axios({
              url:
                "http://localhost/Sureify_tasks/gallery/php/getcatimg.php",
              method: "post",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: form_data,
             
            });
            imageUrlhandler(getimageurls.data.urls);
          }

    return (
        <div  >
        <div >
          <ul className="navbar_ul">
            <li className="navbar_li"><a href="#"  onClick={imagegallery}><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
            <li className="navbar_li"><a  href="#" onClick={upload} >Upload</a></li>
            <li className="navbar_li"><a  href="#" onClick={gallery} >Gallery</a></li>
            <li className="navbar_li"><a  href="#" className="navbar_active"  >Categories</a></li>
            
            <li style={{float:"right"}} className="navbar_li"><a  href="#" onClick={logout} >Logout</a></li>
          </ul>
        </div>
        <div>
        <select class="form-select" aria-label="Default select example" onChange={onOptionSelected}>
            <option selected value="">Select a Category</option>
           {
               categ.map((cat,index)=>(
                  <option value={cat.category}>{cat.category}</option> 
               ))
           }
        </select>      
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
         <h3 style={{color:"red",text_align:"center"}}>Please Select a Category to display</h3>
         }
                 
         </div>
        
        </div>
     
     
     

     
        )
        }

export default Category;