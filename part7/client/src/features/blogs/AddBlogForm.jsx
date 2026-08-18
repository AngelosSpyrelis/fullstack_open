import { LoginForm, Label, Button } from '../utils/StyledComponents';
import { useBLogActions } from '../../hooks/useBlogs';
import { useAuth } from '../../hooks/useAuthenticator';
import { useNotificationActions } from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
const AddBlogForm = () => {
    const navigate = useNavigate();
    const { addBlog } = useBLogActions();
    const { setNotification } = useNotificationActions();
    const user = useAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());
        try {
            await addBlog(formObject, user.token);
            setNotification({
                message: `${formObject.title} by ${formObject.author} was added successfully.`,
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

    return (
        <LoginForm
            data-testid="blog-add-form"
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit}
        >
            <Label>
                Title: <input type="text" name="title" />
            </Label>
            <Label>
                Author: <input type="text" name="author" />
            </Label>
            <Label>
                URL: <input type="text" name="url" />
            </Label>
            <Label>
                Likes: <input type="number" min="0" name="likes" />
            </Label>
            <Button
                data-testid="save-blog-button"
                style={{ width: '100px' }}
                type="submit"
            >
                Save
            </Button>
        </LoginForm>
    );
};

export default AddBlogForm;
