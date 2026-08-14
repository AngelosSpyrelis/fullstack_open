import { render, screen } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';
import userEvent from '@testing-library/user-event';

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlog = vi.fn();
    const user = userEvent.setup();
    const newBlogData = {
        title: 'Test',
        author: 'Angel',
        likes: '5'
    };

    render(<AddBlogForm onSubmit={ addBlog } />);

    const titleInput = screen.getByLabelText('Title:');
    const authorInput = screen.getByLabelText('Author:');
    const likesInput = screen.getByLabelText('Likes:');
    const sendButton = screen.getByText('Save');

    await user.type(titleInput, newBlogData.title);
    await user.type(authorInput, newBlogData.author);
    await user.type(likesInput, newBlogData.likes);
    await user.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    console.log(addBlog.mock.calls[0][0]);
    expect(JSON.stringify(addBlog.mock.calls[0][0])).toBe(JSON.stringify(newBlogData));
});