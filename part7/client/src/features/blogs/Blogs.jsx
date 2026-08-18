import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../hooks/useBlogs';

const BlogLink = styled(Link)`
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    transition: color 0.3 linear;
    &:hover {
        color: #2dd4df;
    }
`;

const LinksWrap = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Blogs = () => {
    const { blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        throw new Error(error);
    }
    return (
        <LinksWrap>
            {blogs.map((blog) => {
                const ref = `/blogs/${blog.id}`;
                return (
                    <BlogLink key={blog.id} to={ref}>
                        {blog.title} by {blog.author}
                    </BlogLink>
                );
            })}
        </LinksWrap>
    );
};

export default Blogs;
