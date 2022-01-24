import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container,FormControl,InputLabel,Select } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { createMeeting } from '../../actions/meetings';


import useStyles from './styles';
import Input from './Input';

const initialState = { subject: '', description: '',year:'',language:'' };

const BookMeeting = () => {
    const [form, setForm] = useState(initialState);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [slots, setSlots] = useState([]);
    const [isSlots, setIsSlots] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        setForm({...form,['year']:user.result.year});
    }, [user]);
    

    const handleSubmit = async (e) => {   
        e.preventDefault();
       
        const tempslots= await axios.get(`http://localhost:5000/booking/getSlots?subject=${form.subject}&year=${form.year}&language=${form.language}`);
        console.log(tempslots.data);
        setSlots(tempslots.data);
        setIsSlots(true);

        
      
    }
    const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value })
                                console.log(user.result);
    }       
    const buttonClickHandler =  (e) => {
        e.preventDefault();
        const reqslot=e.currentTarget.value;

        const meet={slot:reqslot,userId:user.result._id,subject:form.subject,year:form.year,description:form.description};

        dispatch(createMeeting(meet));


            // history.push('/student/mybookings');


           

    }
                                                      

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h4">Book a Meet</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <FormControl >
                            <InputLabel >Subject</InputLabel>
                            <Select
                                native
                                value={form.subject}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'subject',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value='maths'>Maths</option>
                                <option value='english'>English</option>
                                <option value='science'>Science</option>
                                <option value='social'>Social</option>
                                <option value='computer'>Computer</option>
                                <option value='physics'>Physics</option>
                                <option value='chemistry'>Chemistry</option>
                                <option value='biology'>Biology</option>

                                
                               

                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel >Language</InputLabel>
                            <Select
                                native
                                value={form.language}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'language',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value='english'>English</option>
                                <option value='hindi'>Hindi</option>
                                <option value='gujarati'>Gujarati</option>
                                <option value='bengali'>Bengali</option>
                                <option value='marathi'>Marathi</option>
                                <option value='tamil'>Tamil</option>
                                <option value='telugu'>Telugu</option>
                                <option value='kannada'>Kannada</option>
                                <option value='malayalam'>Malayalam</option>
                                <option value='punjabi'>Punjabi</option>

                                
                               

                            </Select>
                        </FormControl>

                        <Input name="description" label="Description" value={form.description} handleChange={handleChange} />

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Get Slots
                    </Button>
                    {isSlots && <div>
                        <Typography component="h1" variant="h4">Available Slots</Typography>
                        <Grid container spacing={2}>
                            {slots.map(slot => (
                               <Button value={slot} onClick={buttonClickHandler}>{slot}</Button>
                            ))}
                        </Grid> 
                        </div>
                    }

                    

                </form>
            </Paper>
        </Container>
    )
}

export default BookMeeting;