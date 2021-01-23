import './View.css';
import React from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import Image from './Image';

const View = () => {

    const history = useHistory();
    const location = useLocation();

    const [uploadImage,imagehandler]=useState(null);
    const [imageUrl,urlhandler]=useState(location.state.imageurl);
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
          form_data = new FormData();
          form_data.append("email", location.state.email);
    
          const getimageurls = await axios({
            url:
              "http://localhost/sureify/gallery/php/getimages.php",
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




    const logout = ()=>
    {
        console.log(location.state);
        history.push("/login");
    }
    if (!(location.state && location.state.email)) {
        history.push("/login");
      }


return (
        <div >
            <div >
            <ul className="navbar_ul">
            <li className="navbar_li"><a className="navbar_active" >Gallery</a></li>
            <li style={{float:"right"}} className="navbar_li"><a  onClick={logout} >Logout</a></li>
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
                <Image path={url.imagedata} ext={url.extention}/>
            )):<p>Images are yet to upload</p>
            };
                    
            </div>

        </div>


    )
}
export default View;