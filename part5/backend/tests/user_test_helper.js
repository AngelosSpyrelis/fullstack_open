const User = require('../models/users');

const initialUsers = [
    {
        username: 'one',
        password: 'adAwd!468dadwc'
    },
    {
        username: 'test',
        password: 'adAwd!468dadwc'
    }
];

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(blog => blog.toJSON());
};

module.exports = { initialUsers, usersInDb };