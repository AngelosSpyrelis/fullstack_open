import { updateAnecdote, addAnecdote, getAll } from '../services/requests';
import { useQuery , useMutation, useQueryClient } from '@tanstack/react-query';
import useNotify from './useNotify';

export const useAnecdotes = () => {
    const { makeNotification } = useNotify();
    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 2
    });

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (result) => {
            makeNotification(`${result.content} was voted.`);
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
        }
    });

    const newAnecdoteMutation = useMutation({
        mutationFn: addAnecdote,
        onSuccess: (result) => {
            makeNotification(`${result.content} was created.`);
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
        },
        onError: (error) => {
            makeNotification(error.message);
        }
    });

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: { is:result.isError, message: result?.error?.message },
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes:0 }),
        updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    };

};