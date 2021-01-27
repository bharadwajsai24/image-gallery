import React ,{useState} from 'react';
import './registration.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () =>{

//constants and states
const [userregister,registerhandler] = useState({});
const history = useHistory();

//capturing userdetails
const onChangeHandler = (e)=>{
    registerhandler({ ...userregister,[e.target.name]:e.target.value});
    console.log(userregister);
}

//handling regestrations
const register = () =>{
    let name=userregister.name;
    let email=userregister.email;
    let password=userregister.password;
    let repass=userregister.rpassword;
    if(password!==repass)
    {
        alert("Both the passwords should be same");
    }
    else if(name == null || email == null || password == null)
    {
        alert("Please Fill all the details");
    }
    else
    {
    var form_data=new FormData();
    form_data.append('name',name);
    form_data.append('email',email);
    form_data.append('password',password);
    const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    axios.post('http://localhost/Sureify_tasks/gallery/php/register.php',form_data,headers)
    .then(response =>{
        let res=response.data;
        console.log(res);
        if(response.data.status === "true")
        {
            alert("Registration Successful Please Click Ok to login");
            history.push("/login");
        }
        else
        {
            alert(response.data.message);   
        }
    });
    
}
}

const login = ()=>{
    history.push("/login");
}

 return (
     <div className="register_div">
    <div className="register">
    <div className="register-header">
    </div>
    <div className="register-form">
    <i><h2  >Gallery Register</h2></i>
         <h3>Name:</h3>
        <input type="text" placeholder="name" name="name" required={true}  onChange={onChangeHandler}/><br/>
        <h3>Email:</h3>
        <input type="email" placeholder="email" name="email"  onChange={onChangeHandler} required={true} /><br/>
        <h3>Password:</h3>
        <input type="password" placeholder="Password" name="password" required={true} onChange={onChangeHandler} />
        <br/>
        <h3>Re Enter Password:</h3>
        <input type="password" placeholder="ReEnter Password" name="rpassword" required={true} onChange={onChangeHandler} />
        <br/>
        
        
        <input type="button" value="register"  className="register-form-button" onClick={register}/>
      
       
        <input type="button" value="Login" className="register-form-button" onClick={login}/>
            <br/>
        
    </div>
    </div>
</div>
    );
}
export default Register;