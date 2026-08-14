import { useState, useImperativeHandle } from 'react';
import styled from 'styled-components';


const NotificationContent = styled.div`
display: flex;
justify-content: space-evenly;
width: 60%;
margin: 25px auto;
padding: 25px 0;
align-items: center;
border: 2px solid red;
border-color: ${ props => props.success? 'green':'red' };
background-color: #111827;
`;

export const Notification = ({ ref }) => {

    const [notification, setNotification] = useState({ message: '', isSuccess: false });

    const makeNotification = ({ message, isSuccess=false, timeout=4000 }) => {
        setNotification({ ...notification, message: message, isSuccess:isSuccess });
        setTimeout(() => { setNotification({ ...notification, message: '', isSuccess:false }); },timeout);
    };

    useImperativeHandle(ref, () => {
        return { makeNotification };
    });

    if(!notification.message){
        return null;
    }
    return(
        <NotificationContent success={ notification.isSuccess } >{notification.message}</NotificationContent>
    );
};