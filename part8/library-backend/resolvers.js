const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                return Book.find({ author: author._id }).populate('author');
            } else if (args.genre) {
                return Book.find({ genres: { $all: args.genre } }).populate(
                    'author'
                );
            }
            return Book.find({}).populate('author');
        },
        allAuthors: async () => {
            const authors = await Author.find({});
            const books = await Book.find({});
            return authors.map((author) => {
                author.bookCount = books.filter(
                    (book) => book.author === author.name
                ).length;
                author.books;
                return author;
            });
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            let newBook = null;
            const author = await Author.findOne({ name: args.author });
            try {
                if (!author) {
                    const newAuthor = new Author({ name: args.author });

                    const res = await newAuthor.save();
                    newBook = new Book({ ...args, author: res._id });
                } else {
                    newBook = new Book({ ...args, author: author._id });
                }
            } catch (error) {
                if (error.name === 'ValidationError') {
                    let message = '';
                    for (field in error.errors) {
                        message += `${error.errors[field].message}. \n`;
                    }
                    throw new GraphQLError(message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                }
            }

            const response = await newBook.save();
            return Book.findOne({ _id: response._id }).populate('author');
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }
            const author = await Author.findOne({ name: args.name });
            if (!author) {
                return null;
            }
            author.born = args.setBornTo;

            return author.save();
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            return user.save().catch((error) => {
                throw new GraphQLError(
                    `Creating the user failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error,
                        },
                    }
                );
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const token = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(token, process.env.JWT_SECRET) };
        },
        _resetDatabase: async () => {
            if (process.env.NODE_ENV !== 'test') {
                throw new GraphQLError(
                    '_resetDatabase is only available in test mode'
                );
            }
            await Author.deleteMany({});
            await Book.deleteMany({});
            await User.deleteMany({});
            return true;
        },
    },
};

module.exports = resolvers;
