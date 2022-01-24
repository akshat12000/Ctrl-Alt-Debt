import axios from "axios";

const url = "http://localhost:5000/blogs";

export const fetchBlogs = () => axios.get(url);
export const createBlogs = (newBlog) => axios.post(`${url}/create`, newBlog);
export const likeBlogs = (blog, id) => axios.put(`${url}/like/${id}`, blog);
export const deleteBlogs = (id) => axios.delete(`${url}/${id}`);
export const updateBlogs = (uBlog, id) => axios.put(`${url}/${id}`, uBlog);
