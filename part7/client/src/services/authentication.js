const baseUrl = '/api/users';

const signIn = async (formData) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    };
    const response = await fetch(`${baseUrl}/sign-in`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
    return await response.json();
};

const signUp = async (formData) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    };
    const response = await fetch(`${baseUrl}/sign-up`, options);
    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.data);
    }
    return await response.json();
};

export default { signIn, signUp };
