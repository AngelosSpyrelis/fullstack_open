import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './src/store';
import anecdoteService from './src/services/anecdotes';


vi.mock('./src/services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        update: vi.fn()
    }
}));

beforeEach(() => {
    useAnecdoteStore.setState({ ancdotes: [], filter: '' });
    vi.clearAllMocks();
});

const mockAnedotes = [
    {
        content: 'If it hurts, do it more often',
        id: '47145',
        votes: 4
    },
    {
        content: 'Adding manpower to a late software project makes it later!',
        id: '21149',
        votes: 1
    },
    {
        content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        id: '98312',
        votes: 5
    }
];

const sortedAnecdotes = [
    {
        content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        id: '98312',
        votes: 5
    },
    {
        content: 'If it hurts, do it more often',
        id: '47145',
        votes: 4
    },
    {
        content: 'Adding manpower to a late software project makes it later!',
        id: '21149',
        votes: 1
    }
];

describe('useNoteActions', () => {
    it('state is initialized with the anecdotes returned by the backend.', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnedotes);

        const { result } = renderHook(() => useAnecdoteActions());

        await act(async () => {
            await result.current.init();
        });

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current).toHaveLength(mockAnedotes.length);
    });

    it('the component displaying anecdotes receives the anecdotes from the store sorted by votes.', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnedotes);

        const { result } = renderHook(() => useAnecdoteActions());

        await act(async () => {
            await result.current.init();
        });

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current).toEqual(sortedAnecdotes);
    });
    it('the correct React component receives a properly filtered list of anecdotes.', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnedotes);

        const { result } = renderHook(() => useAnecdoteActions());

        await act(async () => {
            await result.current.init();
            await result.current.setFilter('If it hurts');
        });

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current.length).toEqual(1);
        expect(anecdoteResult.current[0].id).toEqual('47145');
    });
    it('voting increases the number of votes for an anecdote.', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnedotes);

        const { result } = renderHook(() => useAnecdoteActions());
        anecdoteService.update.mockResolvedValue({ ...mockAnedotes[2], votes: mockAnedotes[2].votes+1 });
        await act(async () => {
            await result.current.init();
            await result.current.voteAnecdote('98312');
        });
        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current[0].votes).toEqual(mockAnedotes[2].votes+1);
    });

});