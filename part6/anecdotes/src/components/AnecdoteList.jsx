import { useAnecdotes, useAnecdoteActions } from '../store';
import { useNotificationAction } from '../notificationStore';

const AnecdoteList = () => {
    const anecdotes = useAnecdotes();
    const { voteAnecdote, removeAnecdote } = useAnecdoteActions();
    const createNotification = useNotificationAction();

    const vote = (id, content) => {
        voteAnecdote(id);
        createNotification(`${ content } was voted.`);
    };

    const remove = (id, content) => {
        removeAnecdote(id);
        createNotification(`${ content } was removed.`);
    };

    return(
        <div>
            { anecdotes.map(anecdote => (
                <div key={ anecdote.id }>
                    <div>{ anecdote.content }</div>
                    <div>
                    has { anecdote.votes }
                        <button onClick={ () => vote(anecdote.id, anecdote.content) }>vote</button>
                    </div>
                    <button onClick={ () => remove(anecdote.id, anecdote.content) }>remove</button>
                </div>
            )) }
        </div>
    );
};

export default AnecdoteList;