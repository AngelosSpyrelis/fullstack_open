import { create } from 'zustand';

const useNotificationStore = create((set) => ({
    notification: {
        message: '',
        isSuccess: true,
    },
    resetTimeout: null,
    actions: {
        setNotification: (notification) => {
            set((state) => ({
                ...state,
                notification: notification,
                resetTimeout: setTimeout(() => {
                    set(() => ({
                        notification: { message: '', isSuccess: true },
                    }));
                }, 5000),
            }));
        },
    },
}));

export const useNotification = () =>
    useNotificationStore((state) => state.notification);
export const useNotificationActions = () =>
    useNotificationStore((state) => state.actions);
