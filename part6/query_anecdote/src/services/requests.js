const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Anecdote server not available due to problems in the server.');
    }
    return await response.json();
};

export const addAnecdote = async (content) => {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
    };
    const response = await fetch(baseUrl, options);
    if (!response.ok) {
        const res  = await response.json();
        throw new Error(res.error);
    }
    return await response.json();
};

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote),
    };
    const response = await fetch(`${baseUrl}/${anecdote.id}`, options);

    if (!response.ok) {
        throw new Error('Failed to update anecdote');
    }

    return await response.json();
};