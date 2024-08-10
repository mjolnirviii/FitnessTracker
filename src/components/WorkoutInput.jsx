
import { useState } from "react";

export default function WorkoutInput(props){

    const [thisKcal, setThisKcal] = useState(0);
    const [thisMinutes, setThisMinutes] = useState(0);

    function handleChange(e){
        const value = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
        if(e.target.id.includes("kcal-input")){
            setThisKcal(value);
        }
        else if(e.target.id.includes("minutes-input")){
            setThisMinutes(value);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("submitting:", thisKcal, thisMinutes)
        props.addWorkout(props.id, thisKcal, thisMinutes);
    }

    const with_add = (
        <form onSubmit={handleSubmit}>
            <label htmlFor={`kcal-input`}>Kcal: </label>
            <input type="number" id={`kcal-input`} onChange={handleChange}/>
            <label htmlFor={`minutes-input`}>Minutes: </label>
            <input type="number" id={`minutes-input`} onChange={handleChange}/>
            <button type="submit">Add</button>
        </form>
    );

    const with_remove = (
        <>
            <span>Kcal: {props.kcal} </span>
            <span>Minutes: {props.minutes} </span>
            <button onClick={() => props.removeWorkout(props.id, props.kcal, props.minutes)}>Remove</button>
        </>
    );

    return(
        <li>
            {props.hasAdd ? with_add : with_remove}
        </li>
    );
}