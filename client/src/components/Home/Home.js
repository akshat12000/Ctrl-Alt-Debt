import React, { useState } from 'react'
import useStyles from './styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSnack from './LoginSnack';

const info = JSON.parse(localStorage.getItem('profile'));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const open = useSelector((state)=>state.open);
    const [ok,setOk]=useState(true);
    if(!info){
        history.push("/auth");
    }

    return (
        <div className={open?classes.root:null}>
        <Carousel width={"78%"}  className={classes.centered} autoPlay={true} >
            <Paper>
                <img src={require("../../images/Available_Timings.png")}/>
                <p className="legend">Available Timings</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Blogs.png")}/>
                <p className="legend">Blogs</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Book_Slot.png")}/>
                <p className="legend">Book Slots</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Discussion.png")}/>
                <p className="legend">Discussion</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Leaderboard.png")}/>
                <p className="legend">Leaderboard</p>
            </Paper>
            <Paper>
                <img src={require("../../images/Resources.png")}/>
                <p className="legend">Resources</p>
            </Paper>
        </Carousel>
        <LoginSnack info={info} ok={ok} setOk={setOk}/>
        </div>
    )
}

export default Home;