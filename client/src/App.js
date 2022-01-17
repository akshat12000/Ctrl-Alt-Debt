import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import AuthStudent from './components/AuthStudent/AuthStudent'
import AuthVolunteer from './components/AuthVolunteer/AuthVolunteer'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import BookMeeting from './components/BookMeeting/BookMeeting'
import AvailableTimings from './components/AvailableTimings/AvailableTimings'


const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/auth/student" component={AuthStudent} />  
                <Route exact path="/auth/volunteer" component={AuthVolunteer} />
                <Route exact path="/student/bookMeeting" component={BookMeeting} />  
                <Route exact path="/volunteer/availableTimings" component={AvailableTimings} />  
            </Switch>
        
        </BrowserRouter>
    )
}

export default App;