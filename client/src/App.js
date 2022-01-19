import React, { useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import AuthStudent from './components/AuthStudent/AuthStudent'
import AuthVolunteer from './components/AuthVolunteer/AuthVolunteer'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import BookMeeting from './components/BookMeeting/BookMeeting'
import AvailableTimings from './components/AvailableTimings/AvailableTimings'
import MyBookings from './components/MyBookings/MyBookings'
import MyMeetings from './components/MyMeetings/MyMeetings'

import Createblogs from './components/Blogs/Createblogs'
import Blogs from './components/Blogs/Blogs'

const App = () => {
    const [open,setOpen]=useState(false);
    return (
        <BrowserRouter>
            <Navbar open={open} setOpen={setOpen}/>
            <Switch>
                <Route exact path="/" render={()=><Home open={open}/>} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/auth/student" component={AuthStudent} />  
                <Route exact path="/auth/volunteer" component={AuthVolunteer} />
                <Route exact path="/student/bookMeeting" component={BookMeeting} />  
                <Route exact path="/volunteer/availableTimings" component={AvailableTimings} /> 
                <Route exact path="/student/myBookings" component={MyBookings} /> 
                <Route exact path="/volunteer/myMeetings" component={MyMeetings} />

                <Route exact path="/auth/volunteer" component={AuthVolunteer} />  
                <Route exact path="/blogs/create" render={()=><Createblogs open={open}/>} />
                <Route exact path="/blogs" render={()=><Blogs open={open}/>} />
            </Switch>
        
        </BrowserRouter>
    )
}

export default App;