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
color: #FFF;
border-radius: 11px;
padding: 5px 10px;
width: fit-content;
`;

const LinkButton = styled(Link)`
color: #FFF;
font-weight: 700;
font-size: 20px;
`;

const Page = styled.div`
padding: 1em;
background-color: #1F2937;
color: #FFF;
min-height: 100vh;
`;

const Navigation = styled.div`
display:flex;
justify-content: space-between;
padding: 5px 5%;
gap:15px;
align-items: center;
background:#0D9488;
margin: 0 0 55px 0;
`;

const HorizontalFlex = styled.div`
display:flex;
gap:15px;
align-items: center;
`;

const Footer = styled.div`
background: Chocolate;
padding: 1em;
margin-top: 1em;
`;

export { LoginForm, Label, Button, LinkButton, Page, Navigation, HorizontalFlex, Footer };