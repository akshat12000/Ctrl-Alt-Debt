import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';


import useStyles from './styles';
import Input from './Input';

const initialState = {};

const BookMeeting = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h4">Book a Meet</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type='text'  />
                    
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                   Submit
                </Button>
    
            </form>
        </Paper>
    </Container>
    )
}

export default BookMeeting;