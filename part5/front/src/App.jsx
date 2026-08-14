
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Blogs from './components/Blogs';
import Blog from './components/Blog';
import blogServer from './services/blogs';

import Login from './components/Login';
import userServer from './services/authentication';

import { Notification } from './components/Notification';
import AddBlogForm from './components/AddBlogForm';
import Toggleable from './components/Togglable';
import {
    BrowserRouter as Router,
    Routes, Route, Link, useMatch
} from 'react-router-dom';

import { Page, LinkButton, Navigation, HorizontalFlex } from './components/StyledComponents';


const App = () => {

    const notificationRef = useRef();
    const navigate = useNavigate();

    /** USER PART*/
    const [user, setUser] = useState(null);


    const handleLogAction = async (formData, formIsLogIn) => {
        if(formIsLogIn){
            const response = await userServer.signIn(formData);
            if(!response.success){
                notificationRef.current.makeNotification({ message: response.data });
                return;
            }

            else{
                notificationRef.current.makeNotification({ message: 'Log in successful!', isSuccess: true });
                window.localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
        }
        else{
            console.log(formData);
            if(formData.password !== formData.retyped){
                return notificationRef.current.makeNotification({ message: 'Your password doesn\'t match the retyped password.' });
            }
            delete formData.retyped;
            const response = await userServer.signUp(formData);
            if(!response.success){
                notificationRef.current.makeNotification({ message: response.data });
            }
            else{
                notificationRef.current.makeNotification({ message: 'Account created successfully!', isSuccess: true });
            }
        }
    };

    const handleLogOut = () => {
        setUser(null);
        window.localStorage.removeItem('user');
        navigate('/');
    };

    /**END OF USER PART */

    /** BLOGS PART */
    const [blogs, setBlogs] = useState([]);


    const getBlogs = async () => {
        const result  = await blogServer.getBlogs();
        if(!result.success){
            notificationRef.current.makeNotification({ message: 'Server error', isSuccess: false });
            return setBlogs([]);
        }
        else{

            const updatedBlogs = [...result.data];

            updatedBlogs.sort((a, b) => Number(b.likes) - Number(a.likes));
            return setBlogs(updatedBlogs);
        }
    };

    const match = useMatch('/blogs/:id');
    const blog = (match)
        ? blogs.find(blog => blog.id === match.params.id)
        : null;

    const handleLikeBlog = async(event) => {
        const id = event.target.parentElement.dataset.id;
        const response = await blogServer.likeBlog(id, user.token);
        if(!response.success){
            notificationRef.current.makeNotification({ message: response.data, isSuccess: false });
        }
        else{
            notificationRef.current.makeNotification({ message: `${response.data.title} by ${response.data.author} was liked successfully.`, isSuccess: true });
            const newBlogs = blogs.map(blog => {
                if(blog.id === id){
                    blog.likes++;
                }
                return blog;
            });
            setBlogs(newBlogs);
        }
    };

    const handleDeleteBlog = async(event) => {
        const id = event.target.parentElement.dataset.id;
        const response = await blogServer.deleteBlog(id, user.token);
        if(!response.success){
            notificationRef.current.makeNotification({ message: response.data, isSuccess: false });
        }
        else{
            notificationRef.current.makeNotification({ message: 'Blog was deleted successfully.', isSuccess: true });
            const newBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(newBlogs);
            navigate('/');
        }
    };

    const handleNewBlog = async (formData) => {
        const response = await blogServer.postBlog(formData, user.token);
        if(!response.success){
            notificationRef.current.makeNotification({ message: response.data });
        }
        else{
            notificationRef.current.makeNotification({ message: `${response.data.title} by ${response.data.author} was posted successfully.`, isSuccess: true });
            const newBlog = response.data;
            const newBlogs = [ ...blogs ];
            newBlogs.push(newBlog);
            newBlogs.sort((a, b) => Number(b.likes) - Number(a.likes));
            setBlogs(newBlogs);
            navigate('/');
        }
    };


    useEffect(() => {
        const initUser = window.localStorage.getItem('user');
        if( initUser ){
            setUser(JSON.parse(initUser));
        }
        getBlogs();
    }, []);


    return(
        <Page>
            <Navigation >
                <h1 style={{ margin: '0' }}>Blog App</h1>
                <HorizontalFlex style={ { display:'flex', gap:'15px' } }>
                    <LinkButton to="/">home</LinkButton>
                    { (user)? <LinkButton to="/create-blog">Create Blog</LinkButton> : '' }
                    { (user)? <button onClick={ handleLogOut }>Log Out</button>:<LinkButton to="/login">login</LinkButton> }
                </HorizontalFlex>
            </Navigation>
            <Notification ref={ notificationRef } />
            <Routes>
                <Route path="/" element={
                    <Blogs blogs={ blogs }/>
                } />
                <Route path="/blogs/:id" element={
                    <Blog blog={ blog } providedUser={ user } onLike={ handleLikeBlog } onDelete={ handleDeleteBlog } />
                } />
                <Route path="/create-blog" element={
                    <AddBlogForm onSubmit={ handleNewBlog } />
                } />
                <Route path="/login" element={
                    <Login user={ user } onSubmit={ handleLogAction } onLogOut={ handleLogOut } />
                } />
            </Routes>
        </Page>
    );

};


export default App;
