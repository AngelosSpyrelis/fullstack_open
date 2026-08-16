
import { create } from 'zustand';
import anecdoteService from './services/anecdotes';
import { useShallow } from 'zustand/react/shallow';

const useAnecdoteStore = create((set, get) => ({
    anecdotes: [],
    filter: '',
    actions: {
        voteAnecdote: async (id) => {
            const anecdote = get().anecdotes.find(anecdote => anecdote.id === id);
            const updatedAnecdote = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes+1 });
            set(state => ({ anecdotes: state.anecdotes.map(anecdote => (anecdote.id === id)?updatedAnecdote:anecdote) }));
        },
        addAnecdote: async (content) => {
            const anecdote = await anecdoteService.createNew(content);
            set(state => ({ anecdotes: [ ...state.anecdotes, anecdote ] }));
        },
        removeAnecdote: async (id) => {
            await anecdoteService.remove(id);
            set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }));
        },
        setFilter: (filter) => set(() => ({ filter: filter }) ),
        init: async () => {
            const anecdotes = await anecdoteService.getAll();
            set(() => ({ anecdotes }));
        }
    },
}));

export const useAnecdotes = () => {
    const anecdotes = useAnecdoteStore(useShallow((state) => state.anecdotes.toSorted((a, b) => b.votes - a.votes)));
    const filter = useAnecdoteStore((state) => state.filter);
    if(!filter){
        return anecdotes;
    }
    const filterRegex = new RegExp(filter, 'g');
    return anecdotes.filter(anecdote => filterRegex.test(anecdote.content)).toSorted((a, b) => b.votes - a.votes);
};
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);


export default useAnecdoteStore;