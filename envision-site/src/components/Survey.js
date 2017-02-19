import React, {Component} from 'react';
import * as Survey from 'survey-react';
import * as firebase from 'firebase';
import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class SignupSurvey extends Component {
    constructor() {
        super();
        this.surveyJSON = {
            pages: [
                {
                    name: "page1",
                    questions: [
                        {
                            type: "text",
                            isRequired: true,
                            name: "name",
                            placeHolder: "John Smith",
                            title: "\nWhat is your name?\n"
                        },
                        {
                            type: "text",
                            isRequired: true,
                            name: "email",
                            placeHolder: "john@smith.com",
                            title: "What is your email?"
                        },
                        {
                            type: "text",
                            isRequired: true,
                            name: "school",
                            title: "What school do you attend?"
                        },
                        {
                            type: "matrix",
                            columns: [
                                "Small ",
                                "Medium ",
                                "Large ",
                                "Extra Large "
                            ],
                            isAllRowRequired: true,
                            isRequired: true,
                            name: "shirt",
                            rows: [
                                "Choose a size:"
                            ],
                            title: "What is your shirt size?",
                            width: "600px"
                        },
                        {
                            type: "comment",
                            name: "dietaryRestrictions",
                            title: "What are your dietary restrictions?"
                        },
                        {
                            type: "comment",
                            name: "experience",
                            title: "What is your previous Hackathon/Coding experience?"
                        },
                        {
                            type: "text",
                            name: "github",
                            title: "Please provide a link to your GitHub/LinkedIn:"
                        },
                        {
                            type: "file",
                            isRequired: true,
                            maxSize: "1000000",
                            name: "resume",
                            storeDataAsText: true,
                            title: "Please provide your resume below."
                        },
                        {
                            type: "comment",
                            name: "openQuestion",
                            rows: 8,
                            title: "What do you hope to get out of this hackathon?"
                        }
                    ]
                }
            ],
            title: "Tell us about yourself."
        }
        this.state = {
            loggedIn: (null !== firebase.auth().currentUser)
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
                loggedIn: (null !== firebaseUser)
            })

            if (firebaseUser) {
                console.log("Logged in", firebaseUser);
                console.log(firebase.auth().currentUser.uid);
            } else {
                console.log('Not logged in');
                browserHistory.push('/');
            }
        });
    }

    sendDataToServer(survey) {
        var resultAsString = JSON.stringify(survey.data);
        console.log(resultAsString);
        firebase.database().ref(firebase.auth().currentUser.uid).set(survey.data)
    };

    render() {
        if(self)
        Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
        Survey.Survey.cssType = "bootstrap";
        return (
            <Survey.Survey json={this.surveyJSON} onComplete={this.sendDataToServer} />
        );
    }
}

export default SignupSurvey;