import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 350px;
`;

const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    background: #111827;
    color: #fff;
    border-radius: 11px;
    padding: 5px 10px;
    width: fit-content;
`;

const LinkButton = styled(Link)`
    color: #fff;
    font-weight: 700;
    font-size: 20px;
`;

const Page = styled.div`
    padding: 1em;
    background-color: #1f2937;
    color: #fff;
    min-height: 100vh;
`;

const HorizontalFlex = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`;

const Footer = styled.div`
    background: Chocolate;
    padding: 1em;
    margin-top: 1em;
`;

export { LoginForm, Label, Button, LinkButton, Page, HorizontalFlex, Footer };
