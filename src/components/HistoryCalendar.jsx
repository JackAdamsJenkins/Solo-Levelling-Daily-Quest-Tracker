import React, { useState } from 'react';
import { getIsoDateString } from '../utils/date_helpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function HistoryCalendar({ history }) {
    const [date, setDate] = useState(new Date());

    const changeMonth = (offset) => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayString = getIsoDateString(new Date());

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <button onClick={() => changeMonth(-1)} className="btn-action p-2 rounded-full"><ChevronLeft /></button>
                <div className="text-xl glow-text">{monthName} {year}</div>
                <button onClick={() => changeMonth(1)} className="btn-action p-2 rounded-full"><ChevronRight /></button>
            </div>
            <div className="calendar-grid">
                {weekDays.map(day => <div key={day} className="calendar-cell calendar-weekday">{day}</div>)}
                {blanks.map((_, i) => <div key={`blank-${i}`} className="calendar-cell"></div>)}
                {days.map(day => {
                    const dayString = getIsoDateString(new Date(year, month, day));
                    const isCompleted = history.includes(dayString);
                    const isToday = dayString === todayString;
                    let cellClass = "calendar-cell";
                    if(isCompleted) cellClass += " calendar-day-completed";
                    if(isToday && !isCompleted) cellClass += " calendar-day-today";

                    return <div key={day} className={cellClass}>{day}</div>;
                })}
            </div>
        </div>
    );
}

export default HistoryCalendar;
