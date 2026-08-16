
import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import { useAnecdoteActions } from './store';
import Notification from './components/Notification';


const App = () => {

    const { init } = useAnecdoteActions();
    useEffect(() => {
        init();
    }, [init]);
    return (
        <div>
            <Notification />
            <Filter />
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;