import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { getDailyMeetings } from "../../redux/POC/meetingSlice";
import { useDispatch, useSelector } from "react-redux";

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarMeet = () => {
  const dispatch = useDispatch();
  const { meetings } = useSelector((state) => state.meetingsManage);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [myDate, setMyDate] = useState([]);

  useEffect(() => {
    if (month < 0 || month > 11) {
      diferentYear();
    }
    getCalendar();
  }, [month, meetings]);

  useEffect(() => {
    handleDate();
    let today = new Date().getDate();
    handleDailyMeetings(today);
  }, []);

  const handleDate = () => {
    const date1 = new Date();
    setYear(date1.getFullYear());
    setMonth(date1.getMonth());
  };

  const diferentYear = () => {
    let date2 = new Date(year, month);
    setYear(date2.getFullYear());
    setMonth(date2.getMonth());
  };

  const getCalendar = (checkDay) => {
    setMyDate([]);
    const firstDayofMonth = new Date(year, month, 1).getDay(), // que dia de la semana empieza el mes
      lastDateofMonth = new Date(year, month + 1, 0).getDate(), // cuantos dias tiene ese mes
      lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(), // dias del prosimo mes
      lastDayofLastMonth = new Date(year, month, 0).getDate(); // cuantos dias tiene el mes anterior

    const dias = [];
    //lista de los dias del mes anterior
    for (let day = firstDayofMonth; day > 0; day--) {
      let isCheck = checkDay === day;
      dias.push({
        day: lastDayofLastMonth - day + 1,
        isToday: false,
        isCheck,
        currentMonth: false,
        meetings: [],
      });
    }
    //lista de los dias del mes actual
    for (let day = 1; day <= lastDateofMonth; day++) {
      let date = year + "-" + (month + 1) + "-" + day;
      const existMeet = filterMeets(date);

      let isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      let isCheck = checkDay === day;
      dias.push({
        day,
        isToday,
        isCheck,
        meetings: existMeet,
        currentMonth: true,
      });
    }
    //lista de los dias del proximo mes
    for (let day = lastDayofMonth; day < 6; day++) {
      let isCheck = checkDay === day;
      dias.push({
        day: day - lastDayofMonth + 1,
        isToday: false,
        isCheck,
        meetings: [],
        currentMonth: false,
      });
    }
    setMyDate(dias);
  };

  //seteo de los meses y años
  const changeDate = (param) => {
    if (param === "next") {
      setMonth(month + 1);
    } else {
      setMonth(month - 1);
    }
  };

  //funcion para para disparar la consulta de reuniones por dia
  const handleDailyMeetings = (day) => {
    getCalendar(day);
    let date = year + "-" + (month + 1) + "-" + day;
    dispatch(getDailyMeetings(date));
  };

  const filterMeets = (date) => {
    const existMeets = meetings.filter((meet) => {
      let calenDate = new Date(date);
      let meetDate = new Date(meet.dateMeet);

      return (
        meetDate.getDate() + 1 === calenDate.getDate() &&
        meetDate.getFullYear() === calenDate.getFullYear() &&
        meetDate.getMonth() === calenDate.getMonth()
      );
    });
    return existMeets;
  };

  return (
    <div className="w-full bg-white rounded-lg px-4 lg:px-16  py-6">
      {/* HEADER */}
      <div className="flex items-center my-2">
        <h2 className="text-primaryPink font-bold w-full">
          {months[month]}
          <span className="ml-2">{year}</span>
        </h2>
        <div className="h-[1px] w-full bg-[#e9e9e9]"></div>
        <div className="flex ">
          <button
            className="border border-[#e9e9e9] text-[#92929D] p-1 rounded-md hover:text-primaryDark hover:border-primaryDark mr-3"
            onClick={() => changeDate("next")}
          >
            <SlArrowUp />{" "}
          </button>
          <button
            className="border border-[#e9e9e9] text-[#92929D] p-1 rounded-md hover:text-primaryDark hover:border-primaryDark"
            onClick={() => changeDate("back")}
          >
            <SlArrowDown />{" "}
          </button>
        </div>
      </div>
      {/* WEEK */}
      <ul className="grid grid-cols-7">
        {week.map((day, index) => (
          <li
            key={index}
            className="text-xs text-center text-[#92929D] font-semibold "
          >
            {day}
          </li>
        ))}
      </ul>
      {/* DAYS */}
      <ul className="grid grid-cols-7 gap-1">
        {myDate?.map((day, index) => (
          <li
            key={index}
            onClick={() =>
              day.currentMonth ? handleDailyMeetings(day.day) : () => {}
            }
            className={`group text-xs text-center 
            hover:bg-primaryPink  py-1 2xl:py-3 px-2 block rounded-md
            ${
              day.isCheck && day.currentMonth
                ? "border border-primaryPink text-primaryPink"
                : ""
            }
            ${
              day.isToday
                ? "text-[#fff] bg-primaryPink font-extrabold animate-bounce"
                : "font-semibold  "
            }
            ${
              day.currentMonth
                ? "text-primaryDark cursor-pointer"
                : "text-[#c3c3c6]"
            }
            `}
          >
            <span className="  group-hover:text-white group-hover:font-extrabold ">
              {day.day} {day.isCheck}
            </span>
            <ul className="flex justify-around">
              {day.meetings.map((meets) => (
                <li
                  className={`mt-1  h-1 w-1 rounded-full 
              group-hover:bg-white
              ${day.isToday ? "bg-white" : "bg-primaryPink"}
              `}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarMeet;
