import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { EDIT_AUTHOR, GET_ALL_AUTHORS } from '../services/queries';

const EditAuthor = ({ authors }) => {
    const [editAuthor] = useMutation(EDIT_AUTHOR);
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const submit = async (event) => {
        event.preventDefault();

        editAuthor({
            variables: {
                name,
                born: parseInt(born),
            },
            refetchQueries: [{ query: GET_ALL_AUTHORS }],
            onError: (error) => console.log(error.message),
        });

        setBorn('');
        setName('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        {authors.map((author) => (
                            <option
                                key={`slt-${author.id}`}
                                value={author.name}
                            >
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">set born date</button>
            </form>
        </div>
    );
};

export default EditAuthor;
