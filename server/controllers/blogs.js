import blog from '../models/blog.js';

export const getBlogs = async (req,res)=>{
    try {
        const blogs = await blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const postBlogs = async (req,res)=>{
    try {
        const Blog = new blog({
            title: req.body.title,
            body: req.body.body,
            year: req.body.year,
            subject: req.body.subject,
            creator:req.body.creator
        });
        Blog.save()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const upVoteBlogs = (req,res)=>{
    try{
        const id=req.params.id;
        const post = req.body;
        blog.findByIdAndUpdate(id,{title:post.title,body:post.body,year:post.year,subject:post.subject,creator:post.creator,$inc:{upvotes:1},upvoteList:post.upvoteList},{new:true},function(err,result){
            if(!err){
                res.status(200).json(result)
            }
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

export const deleteBlogs = (req,res)=>{
    try {

        const id = req.params.id;
        blog.findByIdAndRemove(id,function(err){
            if(!err){
                console.log("Deleted!")
                res.status(200).json({msg:"Deleted!"})
            }
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateBlogs = (req,res)=>{
    try {
        const id = req.params.id;
        const post = req.body;
        console.log(post);
        blog.findByIdAndUpdate(id,{title:post.title,body:post.body,year:post.year,subject:post.subject,creator:post.creator,upvotes:post.upvotes,upvoteList:post.upvoteList},{new:true},function(err,result){
            if(!err){
                res.status(200).json(result);
            }
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}