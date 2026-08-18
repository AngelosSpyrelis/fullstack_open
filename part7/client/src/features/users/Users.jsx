import { useUsers } from '../../hooks/useUsers';
import styled from 'styled-components';
import { LinkButton } from '../utils/StyledComponents';

const Table = styled.table`
    border-collapse: collapse;
    border: 1px solid;
    width: 100%;
    max-width: 1200px;
    ${'tr'} {
        border: 1px solid;
        padding: 5px;
    }
    ${'td'} {
        border: 1px solid;
        padding: 5px;
        text-align: center;
    }
`;

const Users = () => {
    const { users, isLoading, error } = useUsers();
    console.log(users);
    if (isLoading) {
        return <p>Loading content...</p>;
    }
    if (error) {
        throw new Error(error);
    }
    return (
        <Table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Blogs created</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>
                            <LinkButton to={`/users/${user._id}`}>
                                {user.name}
                            </LinkButton>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Users;
