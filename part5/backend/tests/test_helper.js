const Blog = require('../models/blogs');

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:'test.com',
        likes:5
    },
    {
        title: 'Go To Statement Not Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:'test.com',
        likes: 3
    },
    {
        title: 'This has two likes',
        author: 'I.h',
        url:'test.com',
        likes: 2
    } ,
    {
        title: 'Human Made Code Is Always Better',
        author: 'Cicero',
        url:'test.com',
        likes: 10
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };