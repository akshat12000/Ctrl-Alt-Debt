import React,{useEffect} from 'react'
import Blog from './Blog';
import { useSelector } from 'react-redux';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {getBlogs} from '../../actions/blog'
import {Link,Redirect,useHistory} from 'react-router-dom';
import { Button} from '@material-ui/core';


function Blogs() {
    const info = JSON.parse(localStorage.getItem('profile'));
    const id = info?info.result._id:"0";
    const name = info?info.result.name:"guest";
    const history = useHistory();
    if(!info){
      history.push("/auth");
    }
    const blogs = [...useSelector((state)=>state.blogs)];
   
    const open = useSelector((state)=>state.open);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBlogs());
    },[dispatch,id,blogs])


 
    return (
        <div>
            <div className={open?classes.root:null} style={{display:"flex",flexWrap:"wrap"}}>
                {blogs.map((blog)=>
                    <Blog key={blog._id} blog={blog} id={id} name={name}/>
                )}
            </div> 
            {info?(info.result.hasOwnProperty('classRange')?
            <Button style={{position:"absolute",bottom:"2%",right:"2%"}} variant="contained" color="secondary" component={Link} to="/blogs/create">
                Write a blog
            </Button>:null):null}
        </div>
    )
}

export default Blogs
