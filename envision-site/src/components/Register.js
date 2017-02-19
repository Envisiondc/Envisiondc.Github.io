import React, { Component } from 'react';
import * as firebase from 'firebase';
import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'


var Register = React.createClass({
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
        var email = this.refs.email.value;
        var pw = this.refs.pw.value;
        var confirm = this.refs.confirm.value;
        var username = this.refs.username.value;

        if(email.trim() == "" || pw.trim() == "" || confirm.trim() == "" || username.trim() == ""){
            this.setState({error: "Please fill in all required fields"});
        }
        else if(username.indexOf(' ')>=0){
            this.setState({error: "Username cannot contain spaces"});
        }
        else if(pw.toString() != confirm.toString()){
            this.setState({error: "Passwords do not match"});
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, pw)
                .then(function () {
                    if (this.state.error == false) {
                        console.log("passed")
                        var user = firebase.auth().currentUser;
                        user.updateProfile({
                            displayName: username
                        }).then(function() {
                            // Update successful.
                        }, function(e) {
                            console.log(e)
                        });
                    }
                    this.context.router.replace('/')
                }.bind(this), function (error) {
                    this.setState({error: (error.code).substring(5)});
                }.bind(this));

        }
    },
    render: function(){

        if(this.state.error!=false){
            console.log(this.state.error)
            var errors = <h6 className="red"> {this.state.error} </h6>
        }

        return (


            <section id="loginUI" className="pad-xl">
            <div className="row main">
            <div className="main-login main-center">
                <h3 className = "blue2 text-center lead"> Register </h3>
            <form className="form-horizontal"onSubmit={this.handleSubmit} >


            <div className="form-group">
            <label className="cols-sm-2 control-label">Your Email</label>
            <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
            <input type="text" className="form-control" ref="email"  placeholder="Enter your Email"/>
            </div>
            </div>
            </div>

            <div className="form-group">
            <label className="cols-sm-2 control-label">Username</label>
            <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
            <input type="text" className="form-control" ref="username"  placeholder="Enter your Username"/>
            </div>
            </div>
            </div>

            <div className="form-group">
            <label className="cols-sm-2 control-label">Password</label>
            <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
            <input type="password" className="form-control" ref="pw"  placeholder="Enter your Password"/>
            </div>
            </div>
            </div>

            <div className="form-group">
            <label className="cols-sm-2 control-label">Confirm Password</label>
        <div className="cols-sm-10">
            <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
            <input type="password" className="form-control" ref="confirm"  placeholder="Confirm your Password"/>
            </div>
            </div>
            </div>

            <div className="form-group ">
            <button type="submit" className="btn btn-primary-inverse btn-lg btn-block login-button">Register</button>
            </div>
            <div className="login-register"><h6>
            Already a member? <a className = "scroll"> <Link to="/login" className="scroll"> Login. </Link> </a>
            {errors}</h6>
            </div>
            </form>
            </div>
            </div>
            </section>
        )
    }
});

module.exports = Register;