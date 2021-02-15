import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Login from "./components/authentication/login";
import Register from "./components/authentication/registration";
import Error from "./components/authentication/Error";
import View from "./components/View/View";
import Upload from "./components/View/Upload";
import Gallery from "./components/View/Gallery";
import Category from "./components/View/Category";
function RouterConfiguration() {

    console.log(localStorage.getItem('email'));
    return(
    <BrowserRouter>
    <Switch>
    <Route exact path="/view">
        {
         localStorage.getItem('email')!=null ?<View/>:<Redirect to="/login" />
        }
        </Route>
        <Route exact path="/" >
            <Redirect to="/login"></Redirect>
        </Route>
        <Route exact path="/login" >
        {
         <Login />
        }
        </Route>
        <Route exact path="/register" >
            <Register/>
        </Route>
        <Route exact path="/upload" >
            <Upload/>
        </Route>
        <Route exact path="/gallery" >
            <Gallery/>
        </Route>
        <Route exact path="/categories" >
            <Category/>
        </Route>
        <Route exact path="*">
            <Error/>
        </Route>
    </Switch>
    </BrowserRouter>
    );
}
export default RouterConfiguration;