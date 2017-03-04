import React, { Component } from 'react';
import { DefaultRoute, RouteHandler, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class Typeform extends Component {
    render() {

        return (
            <div>
                <iframe id="typeform-full" width="100%" height="100%" frameborder="0" src="https://emerson30.typeform.com/to/F8hjba"></iframe>
            </div>

        );
    }
}

export default Typeform;