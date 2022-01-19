import React, { useState } from 'react'
import useStyles from './styles';
import Carousel from 'react-material-ui-carousel'
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
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <div className={open?classes.root:null}>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <LoginSnack info={info} ok={ok} setOk={setOk}/>
        </div>
    )
}
function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Home;