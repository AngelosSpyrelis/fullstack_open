import { create } from 'zustand';
import { getUser, removeUser, saveUser } from '../services/persistenUser';
import authService from '../services/authentication';

const useAthenticationStore = create((set) => ({
    user: null,
    actions: {
        signIn: async (formData) => {
            const response = await authService.signIn(formData);
            saveUser(response.data);
            set(() => ({ user: response.data }));
        },
        signUp: async (formData) => {
            await authService.signUp(formData);
            return;
        },
        signOut: () => {
            removeUser();
            set(() => ({ user: null }));
        },
        getUserFromLocaldata: () => {
            const user = getUser();
            if (!user) {
                return;
            }
            set(() => ({ user: JSON.parse(user) }));
        },
    },
}));

export const useAuth = () => useAthenticationStore((state) => state.user);
export const useAuthActions = () =>
    useAthenticationStore((state) => state.actions);
