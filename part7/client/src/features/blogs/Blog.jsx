import styled from 'styled-components';
import { Label } from '../utils/StyledComponents';
import { useAuth } from '../../hooks/useAuthenticator';
import { useBLogActions } from '../../hooks/useBlogs';
import { useNotificationActions } from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
const StyledBlog = styled.div`
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

const ExtraBlogDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
`;

const LikeButton = styled.button`
    border: 2px solid #00bfff;
    border-radius: 15px;
    padding: 5px;
    background-color: transparent;
    color: #00bfff;
    &:hover {
        background-color: #00bfff;
        color: #fff;
    }
`;

const DeleteButton = styled(LikeButton)`
    border: 2px solid red;
    color: red;
    &:hover {
        background-color: red;
    }
`;

const Blog = function Blog({ blog }) {
    const navigate = useNavigate();
    const providedUser = useAuth();
    const { likeBlog, deleteBlog, commentOnBlog } = useBLogActions();
    const { setNotification } = useNotificationActions();
    if (!blog) {
        return null;
    }
    const { title, author, likes, id, url, user } = blog;

    const onLike = async () => {
        try {
            await likeBlog(id, providedUser.token);
            setNotification({
                message: `${title} by ${author} liked successfully.`,
                isSuccess: true,
            });
        } catch (error) {
            setNotification({
                message: error,
                isSuccess: false,
            });
        }
    };

    const onDelete = async () => {
        try {
            await deleteBlog(id, providedUser.token);
            setNotification({
                message: `${title} by ${author} deleted successfully.`,
                isSuccess: true,
            });
            navigate('/');
        } catch (error) {
            setNotification({
                message: error,
                isSuccess: false,
            });
        }
    };

    const onComment = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        event.target.reset();
        const formObject = Object.fromEntries(formData.entries());
        try {
            await commentOnBlog(id, providedUser.token, formObject);
            setNotification({
                message: `Commented on ${title} by ${author} successfully.`,
                isSuccess: true,
            });
        } catch (error) {
            setNotification({
                message: error,
                isSuccess: false,
            });
        }
    };
    return (
        <StyledBlog data-testid="blog">
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
                    {title}
                </h3>
                <h4 style={{ fontSize: '15px' }}> by {author}</h4>
            </div>
            <div>
                <ExtraBlogDetails>
                    <p>url: {url}</p>
                    <p className="blog-likes" data-testid="likes">
                        Likes: {likes}
                    </p>
                    <p>Posted by: {user.username}</p>
                    {providedUser ? (
                        <ButtonWrap data-id={id}>
                            <LikeButton
                                data-testid="like-button"
                                onClick={onLike}
                            >
                                Like
                            </LikeButton>
                            {providedUser._id === user.id ? (
                                <DeleteButton
                                    onClick={onDelete}
                                    data-testid="delete-button"
                                    data-question={title + ' by ' + author}
                                >
                                    Delete
                                </DeleteButton>
                            ) : (
                                ''
                            )}
                        </ButtonWrap>
                    ) : (
                        ''
                    )}
                </ExtraBlogDetails>
                <h2>Comments</h2>
                {providedUser ? (
                    <form onSubmit={onComment}>
                        <Label>
                            Comment <input type="text" name="comment" />
                            <button>Add Comment</button>
                        </Label>
                    </form>
                ) : null}

                <ul>
                    {blog.comments.map((comment, index) => (
                        <li key={comment.at(0) + comment.at(-1) + index}>
                            {comment}
                        </li>
                    ))}
                </ul>
            </div>
        </StyledBlog>
    );
};

export default Blog;
