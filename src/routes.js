import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login/login';
import Home from './pages/Home/home';

let routing = (
    <BrowserRouter>
        <switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
        </switch>
    </BrowserRouter>
)

export default routing