import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BlogLink = styled(Link)`
color: #FFF;
font-weight: 500;
font-size: 15px;
transition: color 0.3 linear;
&:hover {
    color: #2DD4DF;
}
`;

const LinksWrap = styled.ul`
display:flex;
flex-direction:column;
gap: 15px;
`;

const Blogs = ({ blogs }) => {

    return (
        <LinksWrap >
            {blogs.map((blog) => {
                const ref = `/blogs/${ blog.id }`;
                return <BlogLink key={ blog.id } to={ ref }>{ blog.title } by { blog.author }</BlogLink>;
            })}
        </LinksWrap>);
};

export default Blogs;