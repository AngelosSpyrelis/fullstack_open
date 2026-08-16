import { create } from 'zustand';


function getStatistics(votes){

    const all = votes.good + votes.neutral+ votes.bad;
    const average = (votes.good - votes.bad)/all;
    const positive = (100*votes.good)/all;

    return { all, average, positive };
}

const useCounterStore = create(set => ({
    votes: {
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0,
        average: 0,
        positive: 0
    },
    actions: {
        voteGood: () => set(state => {
            const votes = { ...state.votes, good: state.votes.good + 1 };
            const statistics = getStatistics(votes);
            return{
                ...state,
                votes: votes,
                statistics: statistics
            };
        }),
        voteNeutral: () => set(state => {
            const votes = { ...state.votes, neutral: state.votes.neutral + 1 };
            const statistics = getStatistics(votes);
            return{
                ...state,
                votes: votes,
                statistics: statistics
            };
        }),
        voteBad: () => set(state => {
            const votes = { ...state.votes, bad: state.votes.bad + 1 };
            const statistics = getStatistics(votes);
            return{
                ...state,
                votes: votes,
                statistics: statistics
            };
        }),
    },
    statistics:{
        all: 0,
        average: 0,
        positive: 0
    }
}));

// the hook functions that are used elsewhere in app
const useVotes = () => useCounterStore(state => state.votes);
const useVoteControls = () => useCounterStore(state => state.actions);
const useVoteStats = () => useCounterStore(state => state.statistics);

export { useVotes, useVoteControls, useVoteStats };