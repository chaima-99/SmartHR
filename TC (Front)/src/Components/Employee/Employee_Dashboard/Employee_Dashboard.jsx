import { useState } from "react";
import { FaCalendarTimes, FaRegClock, FaCheckCircle } from "react-icons/fa";

const EmployeeProfile = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([
    { day: 1, type: "absence" },
    { day: 4, type: "tardiness" },
    { day: 10, type: "normal" },
  ]);
  const [statistics, setStatistics] = useState({
    absence: 10,
    tardiness: 40,
    tasks: 50,
  });
  const [tasks, setTasks] = useState([
    { id: 1, name: "Try me out" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    { id: 2, name: "Empty task" },
    // Add more tasks...
  ]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePreviousMonth = () => {
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

  return (
    <div className="overflow-y-scroll h-[100svh]  justify-center items-center  min-h-screen w-full px-4 sm:px-6 lg:px-12 ml-50">
      {/* Statistics Section */}
      <div className="flex-col mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Absence */}
          <div className="bg-white p-4 shadow rounded-md text-center">
            <FaCalendarTimes className="w-10 h-10 text-red-500 mx-auto" />
            <p className="text-lg font-bold">Absence</p>
            <p className="text-4xl font-bold text-blue-500">{statistics.absence}</p>
          </div>
          {/* Tardiness */}
          <div className="bg-white p-4 shadow rounded-md text-center">
            <FaRegClock className="w-10 h-10 text-orange-500 mx-auto" />
            <p className="text-lg font-bold">Tardiness</p>
            <p className="text-4xl font-bold text-blue-500">{statistics.tardiness}</p>
          </div>
          {/* Tasks */}
          <div className="bg-white p-4 shadow rounded-md text-center">
            <FaCheckCircle className="w-10 h-10 text-green-500 mx-auto" />
            <p className="text-lg font-bold">Tasks</p>
            <p className="text-4xl font-bold text-blue-500">{statistics.tasks}</p>
          </div>
        </div>
      </div>
  
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* Task List */}
        <div className="flex-1 bg-white p-6 shadow rounded-md overflow-y-auto" style={{ maxHeight: "400px" }}>
          <h2 className="text-lg font-bold mb-4">Tasks</h2>
          <ul className="space-y-2">
            {tasks.length === 0 ? (
              <li>No tasks available</li>
            ) : (
              tasks.map((task) => (
                <li key={task.id}>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 w-4 h-4" />
                    {task.name}
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
  
        {/* Calendar */}
        <div className="flex-1 bg-white p-6 shadow rounded-md">
          <h2 className="text-lg font-bold mb-4">My Track</h2>
          <div className="flex justify-between items-center mb-4">
            <button className="text-blue-500" onClick={handlePreviousMonth}>
              ←
            </button>
            <p className="font-bold">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </p>
            <button className="text-blue-500" onClick={handleNextMonth}>
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <span key={day} className="font-medium">
                {day}
              </span>
            ))}
            {Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, index) => {
              const day = index + 1;
              const dayData = calendarData.find((d) => d.day === day);
              const color =
                dayData?.type === "absence"
                  ? "bg-red-500 font-bold text-white"
                  : dayData?.type === "tardiness"
                  ? "bg-orange-500 font-bold text-white"
                  : " text-gray-700";
              return (
                <span key={day} className={`p-2 mx-auto rounded-full ${color}`}>
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default EmployeeProfile;
