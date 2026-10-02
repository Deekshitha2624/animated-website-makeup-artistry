import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  bookedDates: string[];
  selectedDate: string;
  onChange: (date: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({ bookedDates, selectedDate, onChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Generate 42 calendar grid days (including padding)
  const getDaysGrid = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const grid = [];

    // Prev month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      grid.push({
        day: daysInPrevMonth - i,
        month: currentMonth === 0 ? 11 : currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill a full 6-row grid (42 cells)
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push({
        day: i,
        month: currentMonth === 11 ? 0 : currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    return grid;
  };

  const daysGrid = getDaysGrid();

  // Helper to format calendar day to YYYY-MM-DD
  const formatCellDate = (cell: { day: number; month: number; year: number }) => {
    const mm = String(cell.month + 1).padStart(2, '0');
    const dd = String(cell.day).padStart(2, '0');
    return `${cell.year}-${mm}-${dd}`;
  };

  return (
    <div className="w-full bg-[#050505] border border-gold-400/20 p-5 md:p-6 select-none relative z-10 shadow-2xl shadow-black">
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-serif text-base md:text-lg text-gold-50 tracking-wider font-light uppercase">
          {MONTHS[currentMonth]} <span className="text-gold-400/60 font-sans text-xs ml-1 font-normal">{currentYear}</span>
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full border border-gold-400/10 hover:border-gold-400/30 text-gold-200/80 hover:text-gold-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full border border-gold-400/10 hover:border-gold-400/30 text-gold-200/80 hover:text-gold-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {WEEKDAYS.map((day) => (
          <span key={day} className="font-sans text-[10px] tracking-widest text-gold-400/40 uppercase font-medium">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-1.5">
        {daysGrid.map((cell, index) => {
          const dateStr = formatCellDate(cell);
          
          // Check if date is in the past
          const cellDateObj = new Date(cell.year, cell.month, cell.day, 0, 0, 0, 0);
          const isPast = cellDateObj < today;
          
          // Only show booked highlight for today and future dates
          const isBooked = bookedDates.includes(dateStr) && !isPast;
          
          const isSelected = selectedDate === dateStr;
          const isDisabled = isBooked || isPast || !cell.isCurrentMonth;

          let btnClass = "relative aspect-square text-xs font-sans font-light flex items-center justify-center transition-all duration-300 ";
          
          if (isSelected) {
            btnClass += "bg-gold-400 text-luxury-black font-semibold shadow-lg shadow-gold-400/10 border border-gold-400";
          } else if (isBooked) {
            btnClass += "text-gold-300/80 cursor-not-allowed border border-gold-400/25 bg-[#251e12] font-medium";
          } else if (isPast || !cell.isCurrentMonth) {
            btnClass += "text-gold-50/10 cursor-not-allowed pointer-events-none bg-transparent";
          } else {
            btnClass += "text-gold-100 bg-[#0f0f0f] hover:bg-neutral-900 border border-gold-400/5 hover:border-gold-400/40 hover:text-gold-400 cursor-pointer";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(dateStr)}
              className={btnClass}
              title={isBooked ? "Date Booked" : undefined}
            >
              <span>{cell.day}</span>
              {/* Little status indicator dot under the number */}
              {isBooked && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gold-400/40" />
              )}
            </button>
          );
        })}
      </div>
      {/* Legend details */}
      <div className="flex gap-4 justify-center items-center mt-5 pt-4 border-t border-gold-400/5 text-[9px] font-sans tracking-widest uppercase text-gold-200/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#0f0f0f] border border-gold-400/10 inline-block" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#251e12] border border-gold-400/25 inline-block" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-gold-400 inline-block" />
          <span>Full</span>
        </div>
      </div>

    </div>
  );
};
