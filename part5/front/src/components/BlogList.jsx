import { useEffect, useState, useRef } from 'react';
import blogServer from './services/blogs';
import AddBlogForm from './components/AddBlogForm';
import Toggleable from './components/Togglable';
import Blogs from './components/Blogs';

const BlogList = (user) => {

    const [blogs, setBlogs] = useState([]);
    const togglableRef = useRef();
    const getBlogs = async () => {
        const result  = await blogServer.getBlogs();
        if(!result.success){
            notificationRef.current.makeNotification({ message: 'Server error' });
            return setBlogs([]);
        }
        else{
            const updatedBlogs = [...result.data];

            updatedBlogs.sort((a, b) => Number(b.likes) - Number(a.likes));
            return setBlogs(updatedBlogs);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const handleLikeBlog = async(id) => {
        const response = await blogServer.updateBlog(id, user.token);
        if(!response.success){
            notificationRef.current.makeNotification({ message: response.data });
        }
        else{
            notificationRef.current.makeNotification({ message: `${response.data.title} by ${response.data.author} was liked successfully.`, isSuccess: true });
            getBlogs();
        }
    };
    const handleDeleteBlog = async(id) => {
        const response = await blogServer.deleteBlog(id, user.token);
        if(!response.success){
            notificationRef.current.makeNotification({ message: response.data });
        }
        else{
            notificationRef.current.makeNotification({ message: 'Blog was deleted successfully.', isSuccess: true });

            getBlogs();
        }
    };

    if(user){
        return(
            <div>
                <h2>Blogs</h2>
                <div>
                    <Blogs blogs={ blogs } likeAction={ handleLikeBlog } deleteAction={ handleDeleteBlog } user={ user }/>
                    <h3>Add New Blog</h3>
                    <Toggleable ref={ togglableRef }>
                        <AddBlogForm onSubmit={ handleNewBlog } />
                    </Toggleable>
                </div>
            </div>
        );
    }
    return(
        <p>Please log in to be able to use the App.</p>
    );

};

export default BlogList;