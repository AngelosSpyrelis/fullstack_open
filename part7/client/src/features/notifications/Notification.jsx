import { useNotification } from '../../hooks/useNotification';
import styled from 'styled-components';

const NotificationContent = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 60%;
    margin: 25px auto;
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 25px 0;
    align-items: center;
    border: 2px solid red;
    border-color: ${({ success }) => (success ? 'green' : 'red')};
    background-color: #111827;
`;

export const Notification = () => {
    const notification = useNotification();
    if (!notification.message) {
        return null;
    }
    return (
        <NotificationContent success={+notification.isSuccess}>
            {notification.message}
        </NotificationContent>
    );
};
