import React from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import {useState} from 'react';
import './Upload.css';
const Upload = ()=>{

var [image,imagehandler]=useState(null);
var [details,detailshandler]=useState(null);
const history=useHistory();
const onChangeHandler = (e) =>{
    imagehandler(e.target.files[0]);
}
const onDetailsEnteredHandler = (e) =>{
    detailshandler({...details,[e.target.name]:e.target.value});
    console.log(details);
}

const uploadevent=async()=>{
    if(image==null || details==null){
        alert("Fill the details");
        return;
    }
        let form_data = new FormData();
        form_data.append('image',image);
        form_data.append('email',localStorage.getItem('email'));
        form_data.append('note',details.note);
        form_data.append('tag',details.tag);
        
        const response = await axios({
          url: "http://localhost:8000/upload",
          method: "post",
          headers: {
            "Content-Type": "multipart/formdata",
          },
          data: form_data,
        });
        if(response.data.status==="true"){

            alert("Image is uploaded");
        }
}
const logout =()=>{
    localStorage.removeItem('email');
    history.push('/login');
}
const imagegallery =()=>{
    history.push('/view');
}
const categories = ()=>{
    history.push('/categories');
}
const gallery =()=>{
    history.push('/gallery');
}



    return (
        <div  >
        <div >
          <ul className="navbar_ul">
            <li className="navbar_li"><a href="#"  onClick={imagegallery}><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
            <li className="navbar_li"><a  href="#"  className="navbar_active">Upload</a></li>
            <li className="navbar_li"><a  href="#" onClick={gallery} >Gallery</a></li>
            <li className="navbar_li"><a  href="#" onClick={categories} >Categories</a></li>
            
            <li style={{float:"right"}} className="navbar_li"><a  href="#" onClick={logout} >Logout</a></li>
          </ul>
        </div>
        <div className="upload_div_form">
        <div className="divname">
            <input type="file" className="form_file" onChange={onChangeHandler} />
            <br/>
            <input type="text" className="form_input" onChange={onDetailsEnteredHandler} placeholder="Add a Note!!" name="note" />
            <br/>
            <input type="text" className="form_input" onChange={onDetailsEnteredHandler} placeholder="Add a tag" name="tag" />
            <br/>

            <input type="button" value="Add Image" className="form_button" onClick={uploadevent}/>
        </div>
        </div>
        
        </div>
    )





}
export default Upload;