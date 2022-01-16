import React,{useEffect} from 'react'
import Blog from './Blog';
import { useSelector } from 'react-redux';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {getBlogs} from '../../actions/blog'

const info = JSON.parse(localStorage.getItem('profile'));
const name = info?info.result.name:"guest";
const id = info?info.result._id:"0";
console.log(name,id);

function Blogs({open}) {
    const classes = useStyles();
    const blogs = useSelector((state)=>state.blogs)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBlogs());
    },[blogs,dispatch])

    return (
        <div className={open?classes.root:null} style={{display:"flex",flexWrap:"wrap"}}>
            {blogs.map((blog)=>
                <Blog key={blog._id} blog={blog} id={id} name={name}/>
            )}
        </div>  
    )
}

export default Blogs
