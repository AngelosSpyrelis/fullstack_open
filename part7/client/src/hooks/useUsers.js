import { create } from 'zustand';
import userService from '../services/users';

const useUserStore = create((set) => ({
    values: {
        users: [],
        isLoading: false,
        error: '',
    },
    actions: {
        getUsers: async () => {
            set((state) => ({
                values: {
                    ...state.values,
                    isLoading: true,
                },
            }));
            try {
                const users = await userService.getUsers();
                set((state) => ({
                    values: {
                        ...state.values,
                        users: users.data,
                        isLoading: false,
                    },
                }));
            } catch (error) {
                set((state) => ({
                    values: {
                        ...state.values,
                        isLoading: false,
                        error: error,
                    },
                }));
            }
        },
    },
}));

export const useUsers = () => useUserStore((state) => state.values);
export const useUserActions = () => useUserStore((state) => state.actions);
