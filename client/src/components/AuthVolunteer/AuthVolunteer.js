import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormHelperText } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



const initialState = { name: '', email: '', password: '', confirmPassword: '', year: [], userType: '',subjects:[] };


const AuthVolunteer = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    let location = useLocation();
    let initialYear = {
        year1: false,  year2: false,  year3: false, year4: false,year5: false,year6: false,year7: false,year8: false,year9: false,
        year10: false,year11: false,year12: false
    };
    let initialSubjects ={
        maths: false,  english: false,  science: false, social: false,computer: false,
        
    };

    const userType = location.pathname.split("/auth/")[1];
    useEffect(() => {
        setForm({ ...form, userType: userType });
    }, [userType]);

    // setForm({...form,userType:userType});

    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState([]);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [yearState, setYearState] = useState(initialYear);
    const [subjectState, setSubjectState] = useState(initialSubjects);

    const switchMode = () => {

        setIsSignup((prevIsSignup) => !prevIsSignup);

        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        
        for(const item in yearState){
            
            if(yearState[item]){
                
                form.year.push(item.split("year")[1]);
            }
        }
        for(const item in subjectState){
            if(subjectState[item]){
                form.subjects.push(item);
            }
        }

       console.log(form);
        if (isSignup) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
        setForm(initialState,userType);
        setYearState(initialYear);
        setSubjectState(initialSubjects);
        
    };

    const handleYearChange = (event) => {
        setYearState({ ...yearState, [event.target.name]: event.target.checked });
       
    };
    const handleSubjectChange = (event) => {
        setSubjectState({ ...subjectState, [event.target.name]: event.target.checked });
       
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };




    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                       
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        {isSignup && (
                            <>
                                <Input name="name" label="Name" handleChange={handleChange} autoFocus />
                            
                               
                                <Grid item xs={12} sm={ 12}  >
                                <Typography  variant="h5">Select classes you can teach</Typography>
                                    <FormGroup row>
                                        <FormControlLabel control={<Checkbox checked={yearState.class1} onChange={handleYearChange} name="year1" />} label="1" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class2} onChange={handleYearChange} name="year2" />} label="2" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class3} onChange={handleYearChange} name="year3" />} label="3" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class4} onChange={handleYearChange} name="year4" />} label="4" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class5} onChange={handleYearChange} name="year5" />} label="5" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class6} onChange={handleYearChange} name="year6" />} label="6" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class7} onChange={handleYearChange} name="year7" />} label="7" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class8} onChange={handleYearChange} name="year8" />} label="8" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class9} onChange={handleYearChange} name="year9" />} label="9" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class10} onChange={handleYearChange} name="year10" />} label="10" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class11} onChange={handleYearChange} name="year11" />} label="11" />
                                        <FormControlLabel control={<Checkbox checked={yearState.class12} onChange={handleYearChange} name="year12" />} label="12" />
                    
                                      

                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={ 12}  >
                                <Typography  variant="h5">Select subjects you can teach</Typography>
                                    <FormGroup row>
                                        <FormControlLabel control={<Checkbox checked={subjectState.maths} onChange={handleSubjectChange} name="maths" />} label="Maths" />
                                        <FormControlLabel control={<Checkbox checked={subjectState.english} onChange={handleSubjectChange} name="english" />} label="English" />
                                        <FormControlLabel control={<Checkbox checked={subjectState.science} onChange={handleSubjectChange} name="science" />} label="Science" />
                                        <FormControlLabel control={<Checkbox checked={subjectState.social} onChange={handleSubjectChange} name="social" />} label="Social" />
                                        <FormControlLabel control={<Checkbox checked={subjectState.computer} onChange={handleSubjectChange} name="computer" />} label="Computer" />

                                    </FormGroup>
                                </Grid>
                            </>
                        )}
                       
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AuthVolunteer;