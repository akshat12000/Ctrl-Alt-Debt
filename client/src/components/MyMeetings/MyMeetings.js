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
});



const MyMeetings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    
    const handleCancel = async (bookingId) => {
        console.log(bookingId);
        // const res = await axios.post(`http://localhost:5000/booking/cancelBooking?bookingId=${bookingId}`);
        // console.log(res);
        // const newBookings = bookings.filter(booking => booking._id !== bookingId);
        // setBookings(newBookings);
    }


    


    useEffect(() => {
        const getBookings = async () => {
            const bookings = await axios.get(`http://localhost:5000/booking/getVolunteerBookings?userId=${user.result._id}`);
    
            setBookings(bookings.data);
        }

       
        getBookings();
    }
        , [user.result._id])


    return (
        <div>
            <h1>My Meetings</h1>
            
                <Grid spacing={3}>
                {bookings.map(booking => {
                    return (
                        <>
                            <Card className={classes.root} keu={booking._id} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {booking.subject}
                                    </Typography> 
                                    <Typography >
                                        {moment(booking.date).format('MM/DD/YYYY')} {booking.time}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {booking.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Meet Link</Button>
                                    <Button size="small" onClick={handleCancel(booking._id)}>Cancel</Button>
                                </CardActions>
                               
                            </Card>
                          


                        </>

                    )
                }
                )}
                </Grid>

            </div>


    )
}
export default MyMeetings;