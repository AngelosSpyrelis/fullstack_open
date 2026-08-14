import { LoginForm , Label,  Button } from './StyledComponents';
const AddBlogForm = ({ onSubmit }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = {};
        event.target.querySelectorAll('input').forEach(input => {
            formData[input.name] = input.value;
            input.value = '';
        } );
        onSubmit(formData);
    };

    return (
        <LoginForm data-testid="blog-add-form" style={{ display:'flex', flexDirection: 'column' }} onSubmit={ handleSubmit }>
            <Label>Title: <input type="text" name="title" /></Label>
            <Label>Author: <input type="text" name="author" /></Label>
            <Label>URL: <input type="text" name="url" /></Label>
            <Label>Likes: <input type="number" min="0" name="likes" /></Label>
            <Button data-testid="save-blog-button" style={{ width: '100px' }} type="submit" >Save</Button>
        </LoginForm>
    );

};

export default AddBlogForm;