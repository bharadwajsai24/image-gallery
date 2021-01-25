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
function RouterConfiguration() {
    return(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" >
            <Redirect to="/login"></Redirect>
        </Route>
        <Route exact path="/login" >
        {localStorage.getItem('email') ? <Redirect to="/view" /> : <Login />}
        </Route>
        <Route exact path="/register" >
            <Register/>
        </Route>
        <Route exact path="/view">
        {<View/>}
        </Route>
        <Route exact path="*">
            <Error/>
        </Route>
    </Switch>
    </BrowserRouter>
    );
}
export default RouterConfiguration;