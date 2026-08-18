const baseUrl = '/api/users';

const getUsers = async () => {
    const response = await fetch(`${baseUrl}/`, { method: 'GET' });
    if (!response.ok) {
        throw new Error('Failed to download users from server.');
    }
    return await response.json();
};

export default { getUsers };
