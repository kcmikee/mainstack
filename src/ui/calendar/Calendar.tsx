import cn, { generateDate, months } from "@/lib/calendar";
import format from "date-fns/format";
import dayjs from "dayjs";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const days = ["Sun", "Mo", "Tu", "We", "Th", "Fr", "Sat"];

function Calendar({
  selectedDay,
  setSelectedDay,
  minDate,
  maxDate,
}: {
  selectedDay: Date;
  setSelectedDay: Function;

  minDate?: Date;
  maxDate?: Date;
}) {
  const currentDate = dayjs();
  const [today, setToday] = React.useState(currentDate);

  const handleSelect = (day: number) => {
    setSelectedDay(new Date(today.year(), today.month(), day));
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="flex items-center justify-between">
        <FiChevronLeft
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        />
        <p className="text-sm font-semibold text-black300">
          {months[today.month()]} {today.year()}
        </p>
        <FiChevronRight
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        />
      </div>
      <div className=" mt-5">
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <p
              key={index}
              className="text-gray700 text-center text-sm font-semibold"
            >
              {day}
            </p>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index: number) => (
              <div
                className={cn(
                  currentMonth ? "" : "text-transparent",
                  today ? "bg-primary text-black300" : "",
                  selectedDay.toDateString() === date.toDate().toDateString()
                    ? "bg-black300 text-white"
                    : "",
                  "grid h-8 w-8 cursor-pointer select-none place-content-center rounded-full text-sm font-semibold transition-all",
                )}
                key={index}
                onClick={() => {
                  handleSelect(date.date());
                }}
              >
                {date.date()}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
