import React from 'react';
import './Image.css';
const Image = (props)=>{

    




    return (
<div className="Image">
    <img src={`data:image/${props.ext};base64,${props.path}`} className="photo" alt="image" />
    <button className="image_deletebutton">Delete</button>
</div>
    );

}
export default Image;