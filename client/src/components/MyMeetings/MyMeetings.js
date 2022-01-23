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
import { useTranslation } from 'react-i18next';

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



const MyMeetings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const {t,i18n} = useTranslation();
    const open=useSelector((state)=>state.open);
    
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
        <div className={open?classes.goal:null}>
            <Typography variant="h3" style={{textAlign:"center"}}>{t("My Meetings")}</Typography>
            
                <div style={{display:"flex",flexWrap:"wrap",flexBasis:"25%",width:"100%"}}>
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
                                    <Button size="small">{t("Meet Link")}</Button>
                                    <Button size="small" onClick={handleCancel(booking._id)}>{t("Cancel")}</Button>
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
export default MyMeetings;