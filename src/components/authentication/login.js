import React,{useState} from 'react';
import './login.css';
import {useHistory} from 'react-router-dom';
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
          localStorage.setItem('urls',getimageurls.data.urls)
          history.push({
              pathname:'/view',
              state:{
                  email:login.email,
                  password:login.password,
                  imageurl:getimageurls.data.urls,
              },
            }
          );
        }
        else
        {
          alert("Please Enter Correct Details");
        }
    }

    // const signin = async () =>{
    //     let email = login.email;
    //     let pw = login.password;
    //     var form_data= new FormData();
    //     form_data.append("email", email);
    //     form_data.append("password", pw);
    //     console.log(email+"  "+pw);
    //     const headers = {
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //       };
    //       const response = await axios({
    //         url:
    //         "http://localhost/sureify/gallery/php/login.php",
    //         method: "post",
    //         headers: headers,
    //         data: form_data,
    //       });
       
    //         if(response.data.status =="true")
    //         {
                
    //             var form_data=new FormData();
    //             form_data.append('email',login.email);
    //             const headers = {
    //                 headers: {
    //                   'Content-Type': 'application/x-www-form-urlencoded'
    //                 }
    //               };
    //               const getimages = await axios({
    //                 url:
    //                   "http://localhost/sureify/gallery/php/getimages.php",
    //                 method: "post",
    //                 headers: headers,
    //                 data: form_data,
    //               });
    //               urlhandler(getimages.data);
               
    //             history.push({
    //                pathname:"/view",
    //                 state:{
    //                     email:email,
    //                     password:pw,
    //                     imageurl:imageurls,
    //                 },
                
    //             });
    //         }
    //         else
    //         {
    //             alert("Please Enter Valid Details");
    //         }
    //     }

    
   




    const register = () => {
           history.push("/register");
    }
 return (
        <div className="login">
        <div className="login-header">
            <h3 style={{color:'black'}} >Gallery Login</h3>
        </div>
        <div className="login-form">
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

    );
}

export default Login;