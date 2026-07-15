import { useState } from 'react'

const Button = ({text, onClick})=>{
  return(
    
      <button onClick={onClick}>{text}</button>
    
  );
};

const StatisticLine = ({name, data})=>{
  return(
    <tr>
      <td>{name}</td><td>{data}</td>
    </tr>
  );
};

const Statistics = ({good, neutral, bad})=>{
  
  const votes = good+neutral+bad;
  if( votes > 0){
    const average = (good-bad)/votes;
    const positive = (100*good)/votes;
    return(
      <table>
        <tbody>
          <StatisticLine name="Good" data={good}/>
          <StatisticLine name="Neutral" data={neutral}/>
          <StatisticLine name="Bad" data={bad}/>
          <StatisticLine name="Average" data={average}/>
          <StatisticLine name="Positive" data={`${positive}%`}/>
        </tbody>
      </table>
    );
  }
  else{
    return <p>No data yet. Please vote to get data.</p>
  }
};

const Anecdote = ({anecdote, votes})=>{

    return(
      <div>
        <p>{anecdote}</p>
        <p>has {votes} votes.</p>
      </div>
    
  );
};

const MostVotedanecdote = ({anecdote, votes})=>{
  if(votes == 0){
    return(<p>Cast at least one vote to see which is the most voted anecdote</p>);
  }
  return(
    <div>
      <p>The most voted anecdote is:</p>
      <p>{anecdote}</p>
      <p>With {votes} votes.</p>
    </div>
  );
}


const App = () => {
  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [mostVoted, setMostVoted] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetVote = ()=>{
    let newVotes = [...votes];
    newVotes[selected]++;

    //I am breaking out of the loop because the method is called on every single vote cast. So, only one number could be bigger that the current most voted one.
    for(let i = 0; i < newVotes.length; i++){
      if(newVotes[i] > votes[mostVoted]){
        setMostVoted(i);
        break;        
      }
    }
    
    setVotes(newVotes);
  }

  const handleGetAnecdote = ()=>{
    let index = selected
    while(selected == index){
      index =  Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(index);
  };

  const handleSetGood = ()=>{    
    setGood(good+1);
  };
  const handleSetNeutral = ()=>{
    setNeutral(neutral+1);
  };
  const handleSetBad = ()=>{
    setBad(bad+1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button text="Good" onClick={handleSetGood} />
        <Button text="Neutral" onClick={handleSetNeutral} />
        <Button text="Bad" onClick={handleSetBad} />
        
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h3>Random anecdote</h3>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Get Random anecdote" onClick={handleGetAnecdote} />
      <Button text="Vote anecdote" onClick={handleSetVote} />
      <h3>Most Voted anecdote</h3>
      <MostVotedanecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
    </div>
  )
}

export default App
