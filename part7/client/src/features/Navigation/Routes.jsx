import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useMatch,
} from 'react-router-dom';
import { Error404 } from '../errors/404Error';
import { ErrorBoundary } from '../errors/ErrorBoundary';
import Blogs from '../blogs/Blogs';
import Blog from '../blogs/Blog';
import AddBlogForm from '../blogs/AddBlogForm';
import Users from '../users/Users';
import User from '../users/User';
import Login from '../authentication/Login';

import { useBlogs } from '../../hooks/useBlogs';
import { useUsers } from '../../hooks/useUsers';
import { useAuth } from '../../hooks/useAuthenticator';

const RoutesElem = () => {
    const user = useAuth();

    const { blogs } = useBlogs();
    const { users } = useUsers();
    const blogMatch = useMatch('/blogs/:id');
    const blog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null;
    const userMatch = useMatch('/users/:id');
    const selectedUser = userMatch
        ? users.find((userElem) => userElem._id === userMatch.params.id)
        : null;
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ErrorBoundary>
                        <Blogs />
                    </ErrorBoundary>
                }
            />
            <Route
                path="/blogs/:id"
                element={<Blog blog={blog} providedUser={user} />}
            />
            <Route path="/create-blog" element={<AddBlogForm />} />
            <Route
                path="/users"
                element={
                    <ErrorBoundary>
                        <Users />
                    </ErrorBoundary>
                }
            />
            <Route path="/users/:id" element={<User user={selectedUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default RoutesElem;
