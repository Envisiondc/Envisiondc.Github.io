import React, { Component } from 'react';
import * as firebase from 'firebase';

import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return {
            error: false
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
        var self  = this;
        var email = this.refs.email.value;
        var pw    = this.refs.pw.value;

        firebase.auth().signInWithEmailAndPassword(email, pw).then(function(result) {
            var location = self.props.location
            if (location.state && location.state.nextPathname) {
                self.context.router.replace(location.state.nextPathname)
            } else {
                self.context.router.replace('/')
            }
            // User signed in!
            console.log('User signed in!');
            // var uid = result.user.uid;
        }).catch(function(error) {
            this.setState({error: error});
        }.bind(this));
    },
    render: function(){
        if(this.state.error.message!=null)
            var errors = <h6 className="red"> Invalid login. Please check your username and password. </h6>
        console.log(this.state.error);
        return (
        <section id="loginUI" className="pad-xl">
        <div className="row main">
        <div className="main-login main-center">
                <h3 className = "blue text-center lead"> Log in </h3>
            <form className="form-horizontal" onSubmit={this.handleSubmit}>


            <div className="form-group">
        <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
            <input type="text" className="form-control" ref="email"  placeholder="Email"/>
            </div>
            </div>
            </div>


            <div className="form-group">
            <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
            <input type="password" className="form-control" ref="pw"  placeholder="Password"/>
            </div>
            </div>
            </div>


            <div className="form-group ">
            <button type="submit" className="btn btn-primary-inverse btn-lg btn-block login-button">Login</button>
            </div>
            <div className="login-register"><h6>
            Not a member? <a className = "scroll"> <Link to="/register" className="scroll"> Sign up. </Link> </a>
            {errors}</h6>
            </div>
            </form>
            </div>
            </div>
            </section>
        );
    }
});

module.exports = Login;
