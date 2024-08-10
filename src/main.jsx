import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const WORKOUT_DATA = [    // date formatted as: "7/25/2024"
  {total_workouts: 0, total_kcal: 0, total_minutes: 0}, // element 0 keeps track of totals

  { day:"7/25/2024",  // new Date().toLocaleDateString()
    workouts:[
      //{id:0, kcal:0, minutes:0},
    ]
  }
]

const currentDate = new Date();

const dateStored = localStorage.getItem("currentDate");
const dateParsed = new Date(JSON.parse(dateStored));

if(!dateStored || (dateParsed.toLocaleDateString() !== currentDate.toLocaleDateString())){
  WORKOUT_DATA.push({
    day:currentDate.toLocaleDateString(),
    workouts:[]
  });
  localStorage.setItem("currentDate", JSON.stringify(currentDate));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App workout_data={WORKOUT_DATA} current_date={currentDate}/>
  </React.StrictMode>,
)
