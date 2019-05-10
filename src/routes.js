import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Example from './pages/Example/example';

let routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/example" component={Example} />
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default routing