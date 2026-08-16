import { create } from 'zustand';

const useNotificationService = create((set) => ({
    notification: '',
    setNotification : notification => {
        set(() => ({ notification: notification }));
        setTimeout(() => {
            set(() => ({ notification: '' }));
        }, 5000);
    }
}));

export const useNotification = () => useNotificationService((state) => state.notification);
export const useNotificationAction = () => useNotificationService((state) => state.setNotification);