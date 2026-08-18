import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, Label, Button } from '../utils/StyledComponents';
import { useAuth, useAuthActions } from '../../hooks/useAuthenticator';
import { useNotificationActions } from '../../hooks/useNotification';
const Login = () => {
    const navigate = useNavigate();
    const { setNotification } = useNotificationActions();
    const [formIsLogIn, setActiveForm] = useState(true);
    const user = useAuth();
    const { signIn, signUp, signOut } = useAuthActions();
    if (user) {
        return (
            <div>
                {user.username} Logged in.{' '}
                <button
                    onClick={() => {
                        signOut();
                        navigate('/');
                    }}
                >
                    Log out
                </button>
            </div>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        if (formIsLogIn) {
            try {
                await signIn(formObject);
                navigate('/');
                setNotification({
                    message: `${formObject.username} signed in successfully`,
                    isSuccess: true,
                });
            } catch (error) {
                setNotification({
                    message: error.message,
                    isSuccess: false,
                });
            }
        } else {
            try {
                await signUp(formObject);
                setActiveForm(true);
                setNotification({
                    message: `${formObject.username} signed up successfully`,
                    isSuccess: true,
                });
            } catch (error) {
                setNotification({
                    message: error.message,
                    isSuccess: false,
                });
            }
        }
    };

    const toggleActiveForm = () => {
        setActiveForm(!formIsLogIn);
    };

    return (
        <div>
            {formIsLogIn ? (
                <LoginForm
                    key="sign-in"
                    data-type="sign-in"
                    data-testid="sign-in-form"
                    onSubmit={handleSubmit}
                >
                    <h3>Sign In</h3>
                    <Label>
                        Username: <input type="text" name="username" />
                    </Label>
                    <Label>
                        Password: <input type="password" name="password" />
                    </Label>
                    <Button data-testid="sign-in" type="submit">
                        Sign In
                    </Button>
                </LoginForm>
            ) : (
                <LoginForm
                    key="sign-up"
                    data-type="sign-up"
                    onSubmit={handleSubmit}
                >
                    <h3>Sign Up</h3>
                    <Label>
                        Name: <input type="text" name="name" />
                    </Label>
                    <Label>
                        Username: <input type="text" name="username" />
                    </Label>
                    <Label>
                        Password: <input type="password" name="password" />
                    </Label>
                    <Label>
                        Retype Password:{' '}
                        <input type="password" name="retyped" />
                    </Label>
                    <Button id="sign-in-button" type="submit">
                        Sign Up
                    </Button>
                </LoginForm>
            )}

            <button onClick={toggleActiveForm}>
                {formIsLogIn ? 'Or Sign Up' : 'Or Sign In'}
            </button>
        </div>
    );
};

export default Login;
