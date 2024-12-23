import React, { useState } from 'react';

const AdminPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Complete project report', status: 'pending' },
    { id: 2, description: 'Prepare for team meeting', status: 'completed' },
  ]);

  const [newTask, setNewTask] = useState(''); // State for the new task description
  const [checkInStatus, setCheckInStatus] = useState('Waiting for check-in/out');

  const handleCheckInOut = () => {
    setCheckInStatus(prevStatus =>
      prevStatus === 'Waiting for check-in/out' ? 'Checked in' : 'Waiting for check-in/out'
    );
  };

  // Function to handle adding new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1, // Generate a new ID
          description: newTask,
          status: 'pending', // Default status
        },
      ]);
      setNewTask(''); // Clear the input after adding
    }
  };

  // Sample employee data
  const employeeData = [
    { name: 'Jane Cooper', phone: '(925) 555-0118', email: 'jane@microsoft.com', status: 'present' },
    { name: 'Floyd Miles', phone: '(925) 555-0119', email: 'floyd@gmail.com', status: 'present' },
    { name: 'Jerome Bell', phone: '(925) 555-0120', email: 'jerome@tesla.com', status: 'absent' },
    { name: 'Kathryn Murphy', phone: '(925) 555-0121', email: 'kathryn@yahoo.com', status: 'present' },
    { name: 'Jacob Jacobs', phone: '(925) 555-0122', email: 'jacob@gmail.com', status: 'present' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employeeData.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sample HR data
  const hrList = [
    { name: 'Jane Cooper', email: 'jane@microsoft.com', status: 'present' },
    { name: 'John Doe', email: 'john@example.com', status: 'present' },
  ];

  const [currentHRPage, setCurrentHRPage] = useState(1);
  const [hrPerPage] = useState(5);

  const indexOfLastHR = currentHRPage * hrPerPage;
  const indexOfFirstHR = indexOfLastHR - hrPerPage;
  const currentHR = hrList.slice(indexOfFirstHR, indexOfLastHR);

  const paginateHR = (pageNumber) => setCurrentHRPage(pageNumber);

  return (
    <div className="container mx-auto p-4 lg:ml-60">
      <h1 className="text-2xl font-bold mb-4 text-center">Space ADMIN</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Employee List */}
        <div className="bg-white shadow-md rounded p-2">
          <h2 className="text-lg font-semibold mb-2">Employee List</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="border-b text-left px-2 py-1">Name</th>
                <th className="border-b text-left px-2 py-1">Phone</th>
                <th className="border-b text-left px-2 py-1">Email</th>
                <th className="border-b text-left px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                  <td className="border-b px-2 py-1">{employee.name}</td>
                  <td className="border-b px-2 py-1">{employee.phone}</td>
                  <td className="border-b px-2 py-1">{employee.email}</td>
                  <td className="border-b px-2 py-1">{employee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            {Array.from({ length: Math.ceil(employeeData.length / employeesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-2 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* HR List */}
        <div className="bg-white shadow-md rounded p-2">
          <h2 className="text-lg font-semibold mb-2">HR List</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="border-b text-left px-2 py-1">Name</th>
                <th className="border-b text-left px-2 py-1">Email</th>
                <th className="border-b text-left px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentHR.map((hr, index) => (
                <tr key={index}>
                  <td className="border-b px-2 py-1">{hr.name}</td>
                  <td className="border-b px-2 py-1">{hr.email}</td>
                  <td className="border-b px-2 py-1">{hr.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            {Array.from({ length: Math.ceil(hrList.length / hrPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginateHR(pageNumber)}
                className={`px-2 py-1 mx-1 rounded ${currentHRPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow-md rounded p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>

        {/* Task List */}
        <div className="mb-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center border-b py-1">
              <span className="text-sm">{task.description}</span>
              <span className="text-sm">{task.status}</span>
            </div>
          ))}
        </div>

        {/* Add New Task Form */}
        <div className="flex space-x-2">
          <input
            type="text"
            className="border p-2 w-3/4"
            placeholder="Enter new task description"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Check In / Check Out Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleCheckInOut}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Check In / Check Out
        </button>
      </div>

      {/* Check In Status */}
      <div className="mt-2 text-center text-sm">
        {checkInStatus === 'Checked in' ? (
          <div className="bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Checked In
          </div>
        ) : (
          <div className="bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Waiting for Check-in
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
