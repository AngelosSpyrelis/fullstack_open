import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HorizontalFlex, LinkButton } from '../utils/StyledComponents';
import { useAuth, useAuthActions } from '../../hooks/useAuthenticator';
const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 5%;
    gap: 15px;
    align-items: center;
    background: #0d9488;
    margin: 0 0 105px 0;
`;

const Nav = () => {
    const navigate = useNavigate();
    const { signOut } = useAuthActions();
    const user = useAuth();
    return (
        <Navigation>
            <h1 style={{ margin: '0' }}>Blog App</h1>
            <HorizontalFlex style={{ display: 'flex', gap: '15px' }}>
                <LinkButton to="/">home</LinkButton>
                {user ? (
                    <LinkButton to="/create-blog">Create Blog</LinkButton>
                ) : (
                    ''
                )}
                <LinkButton to="/users">Users</LinkButton>
                {user ? (
                    <button
                        onClick={() => {
                            signOut();
                            navigate('/');
                        }}
                    >
                        Log Out
                    </button>
                ) : (
                    <LinkButton to="/login">login</LinkButton>
                )}
            </HorizontalFlex>
        </Navigation>
    );
};

export default Nav;
