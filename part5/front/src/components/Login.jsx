import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, Label, Button } from './StyledComponents';



const Login = ({ user, onSubmit, onLogOut }) => {

    const navigate = useNavigate();
    const [formIsLogIn, setActiveForm] = useState(true);

    if(user){
        return(
            <div>{ user.username } Logged in. <button onClick={ onLogOut }>Log out</button></div>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = {};
        event.target.querySelectorAll('input').forEach(input => {
            formData[input.name] = input.value;
            input.value = '';
        } );
        onSubmit(formData, formIsLogIn);
        if(formIsLogIn){
            navigate('/');
        }
        else{
            setActiveForm(true);
        }
    };

    const toggleActiveForm = () => {
        setActiveForm(!formIsLogIn);
    };

    return (
        <div>
            { (formIsLogIn)?
                <LoginForm key="sign-in" data-type="sign-in" data-testid = "sign-in-form" onSubmit={ handleSubmit }>
                    <h3>Sign In</h3>
                    <Label>Username: <input type="text" name="username"  /></Label>
                    <Label>Password: <input type="password" name="password" /></Label>
                    <Button data-testid="sign-in" type="submit" >Sign In</Button>
                </LoginForm>
                :
                <LoginForm key="sign-up" data-type="sign-up" onSubmit={ handleSubmit }>
                    <h3>Sign Up</h3>
                    <Label>Username: <input type="text" name="username" /></Label>
                    <Label>Password: <input type="password" name="password" /></Label>
                    <Label>Retype Password: <input type="password" name="retyped" /></Label>
                    <Button id="sign-in-button" type="submit" >Sign Up</Button>
                </LoginForm>}

            <button onClick={ toggleActiveForm }>{ (formIsLogIn)?'Or Sign Up':'Or Sign In' }</button>
        </div>
    );

};

export default Login;