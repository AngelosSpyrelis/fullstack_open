import { useQuery } from '@apollo/client/react';
import { GET_ALL_AUTHORS } from '../services/queries';
import EditAuthor from './EditAuthor';
const Authors = (props) => {
    const result = useQuery(GET_ALL_AUTHORS);

    if (result.loading) {
        return <div>loading...</div>;
    }

    if (!props.show) {
        return null;
    }
    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Edit Author</h2>
            <EditAuthor authors={result.data.allAuthors} />
        </div>
    );
};

export default Authors;
