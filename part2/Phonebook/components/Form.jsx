export const Form = ({inputs, submitCallback})=>{

    return(
        <form onSubmit={submitCallback}>
            {inputs.map(input=><label key={input.name}>{input.name}: <input value={input.value} type={input.type} name={input.name} onChange={input.inputCallback}/></label>)}
            <button type="submit">add</button>
      </form>
    );

};