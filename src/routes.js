import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login/login';
import Home from './pages/Home/home';
<<<<<<< HEAD
import AddWork from './pages/AddWork/addWork';
=======
>>>>>>> afa4755819cf5c90e99e7387008b5f80efe49611

let routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/addRoom" component={Login} />
                {/* <Route exact path="/addCode" component={RoomCode} /> */}
                <Route path="/addWork" component={AddWork} />
                <Route path="/" component={Home} />
<<<<<<< HEAD
=======
                {/* <Route path="/example" component={Example} /> */}
>>>>>>> afa4755819cf5c90e99e7387008b5f80efe49611
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default routing