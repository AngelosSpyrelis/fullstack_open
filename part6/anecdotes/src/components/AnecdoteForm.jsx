import { useAnecdoteActions } from '../store';
import { useNotificationAction } from '../notificationStore';
const AnecdoteForm = () => {

    const { addAnecdote } = useAnecdoteActions();
    const createNotification = useNotificationAction();

    const submitAnecdote = (event) => {
        event.preventDefault();
        const input = event.target.querySelector('input');
        if(input.value === ''){ return; }
        addAnecdote(input.value);
        event.target.reset();
        createNotification(`${ input.value } submitted successfully.`);
    };

    return (
        <form onSubmit={ submitAnecdote }>
            <h2>create new</h2>
            <div>
                <input />
            </div>
            <button>create</button>
        </form>
    );
};

export default AnecdoteForm;