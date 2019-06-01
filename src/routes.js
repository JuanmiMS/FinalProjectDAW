import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import AddWork from './pages/AddWork/addWork';
import SeeWork from './pages/SeeWork/seeWork';
import TaskInfo from './pages/TaskInfo/taskInfo';
import SeeUsers from './pages/SeeUsers/seeUsers';

let routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/addRoom" component={Login} />
                <Route path="/addWork" component={AddWork} />
                <Route path="/seeWork" component={SeeWork} />
                <Route path="/seeUsers" component={SeeUsers} />
                <Route path="/taskInfo/:taskId" component={TaskInfo} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default routing