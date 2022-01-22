import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container,FormControl,InputLabel,Select } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


import useStyles from './styles';
import Input from './Input';

const initialState = { subject: '', description: '',year:'' };

const BookMeeting = () => {
    const [form, setForm] = useState(initialState);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [slots, setSlots] = useState([]);
    const {t,i18n} = useTranslation();
    const [isSlots, setIsSlots] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const open = useSelector((state)=>state.open);
    useEffect(() => {
        setForm({...form,['year']:user.result.year});
    }, [user]);
    

    const handleSubmit = async (e) => {   
        e.preventDefault();
       
        const tempslots= await axios.get(`http://localhost:5000/booking/getSlots?subject=${form.subject}&year=${form.year}`);
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

         axios.post(`http://localhost:5000/booking/bookSlot`,{slot:reqslot,userId:user.result._id,subject:form.subject,year:form.year,description:form.description});

            history.push('/student/mybookings');


           

    }
                                                

    return (
        <div className={open?classes.goal:null}>
            <Container component="main" style={{width:"71%"}}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h4">{t("Book a Meet")}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <FormControl >
                                <InputLabel >{t("Subject")}</InputLabel>
                                <Select
                                    native
                                    value={form.subject}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'subject',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value='maths'>{t("Maths")}</option>
                                    <option value='english'>{t("English")}</option>
                                    <option value='science'>{t("Science")}</option>
                                    <option value='social'>{`${t("Social")} ${t("Science")}`}</option>
                                    <option value='computer'>{t("Computer")}</option>
                                    <option value='physics'>{t("Physics")}</option>
                                    <option value='chemistry'>{t("Chemistry")}</option>
                                    <option value='biology'>{t("Biology")}</option>

                                    
                                    

                                </Select>
                            </FormControl>

                            <Input name="description" label={t("Description")} value={form.description} handleChange={handleChange} />

                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {t("Get Slots")}
                        </Button>
                        {isSlots && <div>
                            <Typography component="h1" variant="h4">{t("Available Slots")}</Typography>
                            <div style={{display:"flex",flexWrap:"wrap",flexBasis:"25%"}}>
                                {slots.map(slot => (
                                    <Button value={slot} onClick={buttonClickHandler} variant='outlined' color="primary" style={{margin:"1%"}}>{slot}</Button>
                                ))}
                            </div> 
                            </div>
                        }

                        

                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default BookMeeting;