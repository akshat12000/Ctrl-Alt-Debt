import React,{useState} from 'react'
import useStyles from './styles'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { createBlogs } from '../../actions/blog';

const info = JSON.parse(localStorage.getItem('profile'));
const name = info?info.result.name:"guest";
const id = info?info.result._id:"0";

const initialState={
    title: "",
    body: "",
    year: "",
    subject:"",
    creator:{name,id},
    upvotes:0
}

function Createblogs({open}) {
    const history= useHistory();
    const [blog,setBlog]=useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();

    if(!info){
        history.push("/auth");
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(blog.title&&blog.body&&blog.year&&blog.subject){
            dispatch(createBlogs(blog));
            setBlog(initialState);
            history.push("/blogs");
        }
    }
    return (
        <div className={open?classes.root:null}>
            <Typography variant="h5" style={{textAlign:"center"}} gutterBottom>Create a Blog</Typography>
            <form onSubmit={(e)=>handleSubmit(e)} style={{width:"50%" ,margin:"auto",padding:"1%"}}>
                <TextField style={{margin:"10px"}} type="text" name="title" onChange={(e)=>setBlog({...blog,title:e.target.value})} value={blog.title} placeholder='Title' fullWidth/><br/>
                <TextField style={{margin:"10px"}} type="text" name="body" onChange={(e)=>setBlog({...blog,body:e.target.value})} value={blog.body} placeholder='Body' multiline fullWidth rows={4}/><br/>
                <TextField style={{margin:"10px"}} type="text" name="year" onChange={(e)=>setBlog({...blog,year:e.target.value})} value={blog.year} placeholder='Year' fullWidth/><br/>
                <TextField style={{margin:"10px"}} type="text" name="subject" onChange={(e)=>setBlog({...blog,subject:e.target.value})} value={blog.subject} placeholder='Subject' fullWidth/><br/>
                <div style={{textAlign:"center"}}>
                    <Button style={{margin:"5px"}} type='submit' size="small" color="primary" variant="contained">Submit</Button>
                </div>
            </form>     
        </div>
    )
}

export default Createblogs
