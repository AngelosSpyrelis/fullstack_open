import Blog from '../features/blogs/Blog';

const baseUrl = '/api/blogs';

const getBlogs = async () => {
    const response = await fetch(`${baseUrl}/`, { method: 'GET' });
    if (!response.ok) {
        throw new Error('Failed to download blogs from server.');
    }
    return await response.json();
};

const postBlog = async (formData, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    };
    const response = await fetch(`${baseUrl}/`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
    return await response.json();
};

const likeBlog = async (id, token) => {
    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${baseUrl}/like/${id}`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
    return await response.json();
};

const commentOnBlog = async (id, token, comment) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
    };
    const response = await fetch(`${baseUrl}/comment/${id}`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
    return await response.json();
};

const deleteBlog = async (id, token) => {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(`${baseUrl}/${id}`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
};

export default { getBlogs, postBlog, likeBlog, commentOnBlog, deleteBlog };
