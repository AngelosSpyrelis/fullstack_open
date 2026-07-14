const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header =(props)=> {
    return(
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = (props)=>{
    return(
      <div>
        <p>
          {props.name} {props.exercise}
        </p>
      </div>
    );
  };

  const Content = (props)=>{
    return(
      <div>
        <Part
        name={props.names[0]}
        exercise={props.exercises[0]}
        ></Part>
        <Part
        name={props.names[1]}
        exercise={props.exercises[1]}
        ></Part>
        <Part
        name={props.names[2]}
        exercise={props.exercises[2]}
        ></Part>
      </div>
    );
  };

  const Total = (props)=>{
    return(
      <div>
        <p>
          Number of exercises {props.total}
        </p>
      </div>
    );
  };


  return (
    <div>
      <Header
      course = {course}
      ></Header>
      <Content
      names={[part1, part2, part3]}
      exercises={[exercises1, exercises2, exercises3]}
      ></Content>
      <Total
      total = {exercises1 + exercises2 + exercises3}
      ></Total>
    </div>
  )
}

export default App
