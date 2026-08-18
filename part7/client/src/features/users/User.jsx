import styled from 'styled-components';
const StyledUser = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    min-width: 360px;
    box-shadow: 5px 5px;
    border: 2px solid #fff;
    padding: 25px 5%;
    gap: 25px;
`;
const User = ({ user }) => {
    if (!user) {
        return null;
    }
    return (
        <StyledUser>
            <h1>{user.name}</h1>
            <h2>Added Blogs</h2>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </StyledUser>
    );
};

export default User;
