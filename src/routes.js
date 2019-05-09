import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login/login';
import Home from './pages/Home/home';

let routing = (
    <Provider store={store}>
        <BrowserRouter>
            <switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
            </switch>
        </BrowserRouter>
    </Provider>
)

export default routing