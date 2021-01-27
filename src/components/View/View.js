import './View.css';
import React from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Image from './Image';
import Error from '../authentication/Error';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
const View = () => {

  
    const history = useHistory();
    const location = useLocation();

    const [uploadImage,imagehandler]=useState(null);
    const data=localStorage.getItem('urls');
    const [imageUrl,urlhandler]=useState(location.state.imageurl);
    const bharadwaj={
      urls:data,
    }
   // urlhandler(bharadwaj.urls);
    console.log(data);
    console.log("Bharadwajsai  "+imageUrl);
    
    const onChangeHandler = (e) =>
    {

        console.log("Hi Hello");
        imagehandler( e.target.files[0] );
        console.log(uploadImage);


    }
    const uploading = async () => {
        let form_data = new FormData();
        form_data.append('image',uploadImage);
        form_data.append('email',location.state.email);
        
        const response = await axios({
          url: "http://localhost:8000/upload",
          method: "post",
          headers: {
            "Content-Type": "multipart/formdata",
          },
          data: form_data,
        });
    
        if (response.data.status === "true") {
          alert("Image Upload Successful");
          form_data = new FormData();
          form_data.append("email", location.state.email);
    
          const getimageurls = await axios({
            url:
              "http://localhost/Sureify_tasks/gallery/php/getimages.php",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: form_data,
           
          });
          urlhandler(getimageurls.data.urls);
        }
        else
        {
            alert("Image Upload Failed");
        }

    }
   



    const logout1=() => {
      localStorage.clear();
      logout();
    }


    const logout = ()=>
    {     
        history.push("/login");
    }
    if (!(localStorage.getItem('email'))) {
        history.push("/login");
      }


const deletebutton = async (e)=> {

  console.log(e.target.id);
  let form_data=new FormData();
  form_data.append('sno',e.target.id);
  const response = await axios({
    url: "http://localhost/Sureify_tasks/gallery/php/delete.php",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: form_data,
  });

  if (response.data.status === "true") {
    alert("Image Deletion Successful");
    form_data = new FormData();
    form_data.append("email", location.state.email);

    const getimageurls = await axios({
      url:
        "http://localhost/Sureify_tasks/gallery/php/getimages.php",
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: form_data,
     
    });
    urlhandler(getimageurls.data.urls);
  }
  else
  {
      alert("Image Upload Failed");
  }

}










      
return (
        <div className="view_main" >
            <div >
            <ul className="navbar_ul">
            <li className="navbar_li"><a className="navbar_active" ><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
            <li style={{float:"right"}} className="navbar_li"><a  onClick={logout1} >Logout</a></li>
            </ul>
            </div>
            <div className="divname">
                <input type="file" className="form_file" onChange={onChangeHandler} />
                <br/>
                <input type="button" value="Add Image" className="form_button" onClick={uploading}/>
            </div>

            <div className="image-card">
            {imageUrl.length > 0 ?
               imageUrl.map((url,index)=>(
                <div className="Image">
    <img src={`data:image/${url.extention};base64,${url.imagedata}`} className="photo" alt="image" />
    <button className="image_deletebutton" id={url.sno} onClick={deletebutton}>Delete</button>
</div>
            )):<p>Images are yet to upload</p>
            };
                    
            </div>

        </div>


    )
}
export default View;