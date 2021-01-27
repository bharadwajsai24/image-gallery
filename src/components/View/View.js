import './View.css';
import React from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

const View = () => {

    const history = useHistory();
    const location = useLocation();
    const [uploadImage,imagehandler]=useState(null);
    // const data=localStorage.getItem('urls');
    const [imageUrl,urlhandler]=useState(location.state.imageurl);
    // console.log(data);
    // console.log("Bharadwajsai  "+imageUrl);
    //image selection
    const onChangeHandler = (e) =>
    {

        console.log("Hi Hello");
        imagehandler( e.target.files[0] );
        console.log(uploadImage);


    }

    //imageuploading
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
        //fetching the urls
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
     //logout handler
    const logout1=() => {
     
      logout();
    }
    const logout = ()=>
    {     
        history.push("/login");
    }

    if (!(localStorage.getItem('email'))) {
        history.push("/login");
      }

//delete function implementation
const deleteimage = async (e,ext)=> {

  console.log(e.target.id);
  let form_data=new FormData();
  form_data.append('sno',e.target.id);
  form_data.append('ext',ext);
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
      alert(response.data.message);
  }

}
      
return (
        <div className="view_main" >
            <div >
              <ul className="navbar_ul">
                <li className="navbar_li"><a href="#" className="navbar_active" ><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
                <li style={{float:"right"}} className="navbar_li"><a  href="#" onClick={logout1} >Logout</a></li>
              </ul>
            </div>
            <div className="divname">
                <input type="file" className="form_file" onChange={onChangeHandler} />
                <br/>
                <input type="button" value="Add Image" className="form_button" onClick={uploading}/>
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
export default View;