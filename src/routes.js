import React from 'react';

import App from './pages/base/App.jsx';
import Hello from './pages/base/Hello.jsx'
import Bye from './pages/base/Adios.jsx'

import { BrowserRouter, Route } from 'react-router-dom';

let routing = (
    <BrowserRouter>
        <switch>
            <Route exact path="/" component={App} />
            <Route path="/hello" component={Hello} />
            <Route path="/adios" component={Bye} />
        </switch>
    </BrowserRouter>
)

export default routing