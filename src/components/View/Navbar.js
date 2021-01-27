import React from 'react';
import './Navbar.css';
const Navbar = (props)=>{

    return (
        <div>
              <ul className="navbar_ul">
                <li className="navbar_li"><a href="#" className="navbar_active" ><i src={"/icon-1.jpeg"}/>Image-Gallery</a></li>
                <li style={{float:"right"}} className="navbar_li"><a  href="#" onClick={logout1} >Logout</a></li>
              </ul>
        </div>
    );

}
export default Image;