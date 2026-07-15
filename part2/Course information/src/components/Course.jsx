const Header =({title})=> {
    return(
        <h1>{title}</h1>
    );
};

const Part = ({name, exercises})=>{
    return(

        <li>
            {name} {exercises}
        </li>
    );
};

const Content = ({parts})=>{
    
    return(
        <ul>
            {
                parts.map((part)=>{
                    return <Part key={part.id} name={part.name} exercises={part.exercises} />;
                })
            }
        </ul>
    );
};

const Total = ({total})=>{
    return(
        
        <p>
            Number of exercises: {total}
        </p>
        
    );
};

const Course = ({course})=>{
    
    return(
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts.reduce((total, part)=> total+part.exercises, 0)}/>
        </div>
    );
};

export default Course;
