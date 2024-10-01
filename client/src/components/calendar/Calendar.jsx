import "./calendar.scss";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from "react";

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1
    ));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth -1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  }



  return (
    <div className="calendar">
      <div className="nav-container">
        <div className="header">
          <span>{months[currentMonth]},</span>
          <span>{currentYear}</span>
        </div>
        <div className="calendar-nav">
          <NavigateBeforeIcon onClick={handlePrevMonth} className="icon"/>
          <NavigateNextIcon onClick={handleNextMonth} className="icon"/>
        </div>
      </div>

      <div className="calendar-body">
        <div className="days">
          {days.map((day) => (
            <span key={day}>
              {day}
            </span>
          ))}
        </div>
        <div className="date">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`}/>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span key={day + 1} className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ?  "today" : ""}>
              {day + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
