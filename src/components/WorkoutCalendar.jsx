import { useState } from "react";
import {Calendar} from "react-calendar";

export default function WorkoutCalendar(props){

    const [datePicked, setDatePicked] = useState(props.current_date);

    function getWeekRange(){
        const startDate = props.current_date;
        startDate.setDate(startDate.getDate() - startDate.getDay()); // sunday 1st day
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7); // saturday last day
        return [startDate, endDate];
    }

    // maybe similar to WorkoutInput 2 cases,
    // 1 week calendar, full calendar

    return(
        <div className="calendar">
            <Calendar 
                onChange={setDatePicked} 
                value={datePicked} 

                tileDisabled={({date}) => {
                    const [startDate, endDate] = getWeekRange();
                    return date < startDate || date > endDate;
                }}

                // tileContent={({ date, view }) => {
                    
                // }}
            />
        </div>
    );
}