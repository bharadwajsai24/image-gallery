import React ,{useState} from 'react';
import './registration.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () =>{

const [userregister,registerhandler] = useState({});
const history = useHistory();

const onChangeHandler = (e)=>{
    registerhandler({ ...userregister,[e.target.name]:e.target.value});
    console.log(userregister);
}

const register = () =>{
    let name=userregister.name;
    let email=userregister.email;
    let password=userregister.password;
    if(name == null || email == null || password == null)
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
    axios.post('http://localhost/sureify/gallery/php/register.php',form_data,headers)
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
            alert("Registration unsuccessful");   
        }
    });
    
}
}
const login = ()=>{
    history.push("/login");
}

 return (
    <div className="register">
    <div className="register-header">
        <h4 style={{color:'black'}}>Gallery register</h4>
    </div>
    <div className="register-form">
         <h3>Name:</h3>
        <input type="text" placeholder="name" name="name" required={true}  onChange={onChangeHandler}/><br/>
        <h3>Email:</h3>
        <input type="email" placeholder="email" name="email"  onChange={onChangeHandler} required={true} /><br/>
        <h3>Password:</h3>
        <input type="password" placeholder="Password" name="password" required={true} onChange={onChangeHandler} />
        <br/>
        
        
        <input type="button" value="register"  className="register-form-button" onClick={register}/>
      
        <br/>
        <input type="button" value="Login" className="register-form-button" onClick={login}/>
            <br/>
        
    </div>
    </div>

    );
}
export default Register;