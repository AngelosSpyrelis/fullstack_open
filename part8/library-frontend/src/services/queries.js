import { gql } from '@apollo/client';

const GET_ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

const GET_ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            genres
            id
            published
            title
            author {
                name
            }
        }
    }
`;

const CREATE_BOOK = gql`
    mutation createBook(
        $author: String!
        $title: String!
        $published: Int!
        $genres: [String!]
    ) {
        addBook(
            author: $author
            title: $title
            published: $published
            genres: $genres
        ) {
            author {
                name
            }
            title
            published
            genres
        }
    }
`;

const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;

export { GET_ALL_AUTHORS, GET_ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR };
