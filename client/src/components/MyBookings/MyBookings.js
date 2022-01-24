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
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal,Box ,TextField} from '@material-ui/core'
import useStyles from './styles';
const options = [
    'report'
];
const ITEM_HEIGHT = 48;








const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openm, setOpenm] = useState(false);
    const classes=useStyles();

    const handleOpenm = () => {
        setOpenm(true);
    };

    const handleClosem = () => {
        setOpenm(false);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        handleOpenm();
        console.log("close");
        setAnchorEl(null);
    };


    const handleCancel = async (e) => {
        e.preventDefault();
        const bookingId = e.target[0].value;


        const kings = await axios.post('http://localhost:5000/booking/removeBooking', { bookingId: bookingId });
        setBookings(kings.data);



    }
    const reportHandler = async (e) => {
        e.preventDefault();
        
        const bookingId = e.target[0].value;
        const studentId = e.target[2].value;
        const volunteerId = e.target[1].value;
        const description = e.target[3].value;

        const complaint = { bookingId, studentId, volunteerId, description };
       
        const response = await axios.post('http://localhost:5000/complaint', complaint);
        handleClosem();
        alert("Your complaint has been submitted"); 
        


    }



    useEffect(() => {
        const getBookings = async () => {
            const bkings = await axios.get(`http://localhost:5000/booking/getBookings?userId=${user.result._id}`);

            setBookings(bkings.data);
        }
        getBookings();
    }
        , []);

       

    return (
        <div>
            <h1>My Bookings</h1>

            <Grid>
                {bookings.map(booking => {
                    return (
                        <>


                            <Card key={booking._id} variant="outlined">


                                <CardContent>
                                    <Typography variant="h5" component="h2">

                                        {booking.subject}

                                    </Typography>
                                    <Typography color="textSecondary">
                                        {moment(booking.date).format('MM/DD/YYYY')} {booking.time}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {booking.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {booking.status != "cancelled" && <a target="_blank" href={booking.meetLink}>Meet Link</a>}
                                    {booking.status == "cancelled" &&
                                        <div>
                                            <div style={{ color: 'red' }}>cancelled</div>
                                            <form onSubmit={handleCancel}>
                                                <input type="hidden" name="bookingId" value={booking._id} />
                                                <Button type="submit" size="small">Remove</Button>
                                            </form>
                                        </div>}
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>

                                </CardActions>
                                <Modal

                                    open={openm}
                                    onClose={handleClosem}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                >
                                    <Box className={classes.modal} style={{height:"50vh"}}>
                                        <form onSubmit={reportHandler}>
                                        <input type="hidden" name="bookingId" value={booking._id} />
                                        <input type="hidden" name="volunteerId" value={booking.volunteerId} />
                                        <input type="hidden" name="studentId" value={booking.studentId} />
                                        
                                        <TextField style={{margin:"7px"}}  variant="standard" placeholder='Complaint' label="Complaint" fullWidth/><br/>
                                        <Button style={{margin:"5px"}} size="small" type="submit" variant='outlined' color="primary">Submit</Button>
                                        </form>
                                        </Box>
                                </Modal>
                            </Card>



                        </>

                    )
                }
                )}
            </Grid>

        </div>


    )
}
export default MyBookings;