import React from 'react';

import App from './pages/App.jsx';
import Hello from './pages/Hello.jsx'
import Bye from './pages/Adios.jsx'
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