import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from "./components/Login";
import Register from "./components/Register";
import SignupSurvey from "./components/Survey";
import Typeform from "./components/Typeform";
import './index.css';

import * as firebase from 'firebase';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

const config = {
    apiKey: "AIzaSyD9FcbiRnSgs9glYSciGpEkO4mM4lT9JXc",
    authDomain: "envision-fdfb8.firebaseapp.com",
    databaseURL: "https://envision-fdfb8.firebaseio.com",
    storageBucket: "envision-fdfb8.appspot.com"
};

const fb = firebase
    .initializeApp(config)
    .database()
    .ref();

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/survey" component={SignupSurvey}/>
        <Route path="/test" component={Typeform}/>

    </Router>,
  document.getElementById('root')
);
