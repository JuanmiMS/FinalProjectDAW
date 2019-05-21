import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import AddWork from './pages/AddWork/addWork';

let routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/addRoom" component={Login} />
                <Route path="/addWork" component={AddWork} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default routing