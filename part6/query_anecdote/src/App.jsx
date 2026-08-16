import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useAnecdotes } from './hooks/useAnecdotes';
import useNotificationContext from './hooks/useNotify';

const App = () => {
    const { updateAnecdote, anecdotes, isPending, isError } = useAnecdotes();
    const { notification } = useNotificationContext();
    const handleVote = (anecdote) => {
        updateAnecdote(anecdote);
    };

    if (isPending) {
        return <div>loading data...</div>;
    }
    else if(isError.is){
        return <div>{ isError.message }</div>;
    }
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification notification={ notification }/>
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;