const getUser = () => {
    const user = window.localStorage.getItem('user');
    return user;
};
const saveUser = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user));
};
const removeUser = () => {
    window.localStorage.removeItem('user');
};

export { getUser, saveUser, removeUser };
