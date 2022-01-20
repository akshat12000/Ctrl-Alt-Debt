import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
const drawerWidth=240;
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    goal:{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    }
});



const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const open = useSelector((state)=>state.open);

    useEffect(() => {
        const getBookings = async () => {
            const bkings = await axios.get(`http://localhost:5000/booking/getBookings?userId=${user.result._id}`);

            setBookings(bkings.data);
        }
        getBookings();
    }
        , []); 


    return (
        <div className={open?classes.goal:null}>
            <Typography variant="h3" style={{textAlign:"center"}} gutterBottom>My Bookings</Typography>
                <div style={{display:"flex",flexWrap:"wrap",flexBasis:"25%",width:"100%"}}>
                {bookings.map(booking => {
                    return (
                        <>
                            <Card className={classes.root} key={booking._id} variant="outlined" style={{margin:"1%"}}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {booking.subject}
                                    </Typography> 
                                    <Typography className={classes.pos} color="textSecondary">
                                        {moment(booking.date).format('MM/DD/YYYY')} {booking.time}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {booking.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="secondary">Meet Link</Button>
                                </CardActions>
                            </Card>
                            


                        </>

                    )
                }
                )}
                </div>
            </div>


    )
}
export default MyBookings;