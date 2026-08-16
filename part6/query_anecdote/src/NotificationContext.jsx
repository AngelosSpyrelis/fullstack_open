import { createContext, useState } from 'react';

const NotificationContext = createContext();

export default NotificationContext;


export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('');

    const makeNotification = (notification) => {
        setNotification(notification);
        setTimeout(() => { setNotification(''); }, 5000);
    };
    return (
        <NotificationContext.Provider value={{ notification,  makeNotification }}>
            {props.children}
        </NotificationContext.Provider>
    );
};