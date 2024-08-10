import { useEffect, useState } from "react";
import {nanoid} from "nanoid"; // for unique ids
import WorkoutInput from "./components/WorkoutInput";
import WorkoutCalendar from "./components/WorkoutCalendar";

export default function App(props) {

    //const [workoutData, setWorkoutData] = useState(props.workout_data); // all days data
    const [todaysData, setTodaysData] = useState(props.workout_data[props.workout_data.length-1].workouts); // todays data
    const [allTimeData, setAllTimeData] = useState(props.workout_data[0]);

    const todaysWorkouts = todaysData.map((workout) =>
        <WorkoutInput key={workout.id} id={workout.id} kcal={workout.kcal} minutes={workout.minutes} hasAdd={false} removeWorkout={removeWorkout}/>
    );
    todaysWorkouts.push(<WorkoutInput key={nanoid()} id={nanoid()} hasAdd={true} addWorkout={addWorkout}/>)

    // get (once) and set data to local storage to survive refresh
    useEffect(() => {
        const allTimeStored = localStorage.getItem("allTimeData");
        const todayStored = localStorage.getItem("todaysData");
        if(allTimeStored){
            setAllTimeData(JSON.parse(allTimeStored));
            setTodaysData(JSON.parse(todayStored));
        }
    }, []);

    useEffect(() => {
        if(todaysData.length > 0){
            localStorage.setItem("allTimeData", JSON.stringify(allTimeData));
            localStorage.setItem("todaysData", JSON.stringify(todaysData));  
        }
    }, [allTimeData, todaysData]);

    function addWorkout(id, kcal, minutes){
        const newWorkout = {id, kcal, minutes}; // will be nanoid from above
        const newAllTimeData = allTimeData;
        newAllTimeData.total_workouts++;
        newAllTimeData.total_kcal += kcal;
        newAllTimeData.total_minutes += minutes;
        setAllTimeData(newAllTimeData);
        setTodaysData([...todaysData, newWorkout]);
    }

    function removeWorkout(id, kcal, minutes){
        const newTodaysData = todaysData.filter((workout) => workout.id !== id);
        const newAllTimeData = allTimeData;
        newAllTimeData.total_workouts--;
        newAllTimeData.total_kcal -= kcal;
        newAllTimeData.total_minutes -= minutes;
        setAllTimeData(newAllTimeData);
        setTodaysData(newTodaysData);
    }

    return(
        <div className="fitness-tracker">

            <h1>Fitness Tracker</h1>
            {/* Work on this too, thinking about storing 3 vars that change depending on add, remove workout */}
            <div className="all-time-records">  
                <h2>All Time Records</h2>
                <span>Workouts: {allTimeData.total_workouts} </span>
                <span>Kcal: {allTimeData.total_kcal} </span>
                <span>Minutes: {allTimeData.total_minutes} </span>
            </div>
            
            <div className="current-day">
                <h2>{props.current_date.toLocaleDateString()}</h2>
                <ol>
                    {todaysWorkouts}
                </ol>
            </div>

            <div className="history">
                <h2>History</h2>
                <WorkoutCalendar current_date={props.current_date}/>
                <div className="streak-info">
                    <span>1 Day Streak </span>
                    <span>Personal Best: 1 Day </span>
                </div>
                <button>All records</button>
            </div>

        </div>
    );
}
