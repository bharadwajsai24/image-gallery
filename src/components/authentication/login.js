import React,{useState} from 'react';
import './login.css';
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
const Login = () =>{

    const [login,loginhandler]=useState({  });
    //const [imageurls,urlhandler]=useState();
    const history=useHistory();
    //invoked when values are entered in input fields
    const onChangeHandler = (e) =>{
            loginhandler({ ...login,[e.target.name]:e.target.value});
            console.log(login);
        };
    //invoked when the form is dubmitted

    const signin = async () => {
        var form_data = new FormData();
        form_data.append("email", login.email);
        form_data.append("password", login.password);
        if(login.email==null || login.password==null)
        {
            alert("Enter all the details");
        }
        else
        {
        const response = await axios({
          url: "http://localhost/Sureify_tasks/gallery/php/login.php",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: form_data,
        });
    
        if (response.data.status === "true") {
          form_data = new FormData();
          form_data.append("email", login.email);
    
          const getimageurls = await axios({
            url:
              "http://localhost/Sureify_tasks/gallery/php/getimages.php",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: form_data,
          });
          localStorage.setItem('email',login.email);
          history.push({
            pathname: "/view",
            state: {
              email: login.email,
              password: login.password,
              imageurl: getimageurls.data.urls,
            },
          });

          
        }
        else
        {
          alert(response.data.message);
        }
    }
  }
    
  const register = () => {
           history.push("/register");
    }
 return (
   <div className="login_div">
        <div className="login">
        <div className="login-header">
            
        </div>
        <div className="login-form">
        
        <i><h2  >Gallery Login</h2></i>

            <h3>Email:</h3>
            <input type="email" placeholder="email" name="email" onChange={onChangeHandler}/><br/>
            <h3>Password:</h3>
            <input type="password" placeholder="Password" name="password" onChange={onChangeHandler}/>
            <br/>
            <input type="button" value="Login" className="login-form-button" onClick={signin}/>
            <br/>
            <input type="button" value="Register" className="login-form-button" onClick={register}/>
            <br/>
        </div>
        </div>
        </div>
    );
}

export default Login;