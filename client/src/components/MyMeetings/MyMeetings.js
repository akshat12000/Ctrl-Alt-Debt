import axios from "axios";
import React, { useState, useEffect, useDebugValue } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMeetings } from "../../actions/meetings";





const MyMeetings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const history = useHistory();
    const dispatch = useDispatch();
    const meetings=useSelector((state)=>state.meetings);

    const handleCancel = async (e) => {
        e.preventDefault();
        const bookingId = e.target[0].value;


        const kings = await axios.post('http://localhost:5000/booking/cancelBooking', { bookingId: bookingId });
        setBookings(kings.data);
        alert("Booking Cancelled");


    }
    const handleRemove = async (e) => {
        e.preventDefault();
        const bookingId = e.target[0].value;


        const kings = await axios.post('http://localhost:5000/booking/removeBooking', { bookingId: bookingId });
        setBookings(kings.data);
        alert("Meeting Completed");
    }

    useEffect(() => {
        dispatch(getMeetings(user.result._id));
    }, [dispatch]);






    return (    
        <div>
            <h1>My Meetings</h1>

            <Grid>
                {meetings.map(booking => {
                    return (
                        <>
                            {booking.status == "confirmed" && <Card key={booking._id} variant="outlined">
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

                                <form onSubmit={handleCancel}>
                                    <input type="hidden" name="bookingId" value={booking._id} />
                                    <Button type="submit" size="small">Cancel</Button>
                                </form>
                                <form onSubmit={handleRemove}>
                                    <input type="hidden" name="bookingId" value={booking._id} />
                                    <Button type="submit" size="small">Completed</Button>
                                </form>
                                <a target="_blank" href={booking.meetLink}>Meet Link</a>



                            </Card>}




                        </>

                    )
                }
                )}
            </Grid>

        </div>


    )
}
export default MyMeetings;