import React, { useState, useEffect } from 'react';
import './timetable.css';

const Timetable = () => {
  const [schedule, setSchedule] = useState([]);

  // Load the timetable data from the JSON file
  useEffect(() => {
    fetch('/timetable.json') // Adjust the path to the JSON file
      .then(response => response.json())
      .then(data => setSchedule(data))
      .catch(error => console.error('Error fetching timetable:', error));
  }, []);

  // Create a map to convert days to table columns
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Helper function to determine if it's mobile view
  const isMobileView = () => window.innerWidth <= 768;

  return (
    <div className="timetable-container">
      <h1>Class Schedule for Fall 2024</h1>
      {isMobileView() ? (
        // Mobile view
        daysOfWeek.map(day => (
          <div key={day}>
            <div className="day-header">{day}</div>
            <div className="day-cell">
              {schedule
                .filter(item => item.days.includes(day))
                .map((item, index) => (
                  <div key={index} className="class-item">
                    <div className="class-title">{item.name}</div>
                    <div className="class-info">{item.time}</div>
                    <div className="class-info">{item.location}</div>
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        // Desktop view
        <div className="timetable-grid">
          {/* Render the header row */}
          <div className="timetable-header">
            <div className="time-slot-header"></div>
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>

          {/* Render the time slots */}
          {Array.from({ length: 10 }, (_, hour) => (
            <div className="timetable-row" key={hour}>
              {/* Time slot column */}
              <div className="time-slot">{8 + hour}:00</div>

              {/* Days columns */}
              {daysOfWeek.map(day => (
                <div key={day} className="day-cell">
                  {schedule
                    .filter(item => 
                      // Check if the item's day matches the current day
                      item.days.includes(day) &&
                      parseInt(item.time.split('-')[0]) === (8 + hour)
                    )
                    .map((item, index) => (
                      <div key={index} className="class-item">
                        <div className="class-title">{item.name}</div>
                        <div className="class-info">{item.time}</div>
                        <div className="class-info">{item.location}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timetable;
