import { useState, useEffect } from 'react';

const LeaveRequestPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeData = [
        { id: 1, name: 'Samantha', leaveRequest: { reason: 'Medical Leave', from: '01/02/2023', to: '05/02/2023', documentation: 'file.pdf' } },
        { id: 2, name: 'Jane Cooper', leaveRequest: { reason: 'Personal Leave', from: '10/02/2023', to: '12/02/2023', documentation: 'file.pdf' } },
        { id: 3, name: 'Floyd Miles', leaveRequest: { reason: 'Vacation', from: '15/02/2023', to: '20/02/2023', documentation: 'file.pdf' } },
        { id: 4, name: 'Marvin McKinney', leaveRequest: { reason: 'Family Emergency', from: '22/02/2023', to: '25/02/2023', documentation: 'file.pdf' } },
      ];
      setEmployees(employeeData);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleAccept = () => {
    alert(`Leave request accepted for ${selectedEmployee.name}`);
  };

  const handleDecline = () => {
    alert(`Leave request declined for ${selectedEmployee.name}`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 lg:ml-64 ">
      {/* Employee List with Glassmorphism Effect */}
      <div className="bg-white bg-opacity-30 backdrop-blur-lg w-full lg:w-1/3 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
        <ul>
          {employees.map((employee) => (
            <li
              key={employee.id}
              className="p-2 cursor-pointer hover:bg-blue-200 rounded-lg transition transform hover:scale-105 mb-2"
              onClick={() => handleEmployeeClick(employee)}
            >
              {employee.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Leave Request Details with Glassmorphism Effect */}
      <div className={`bg-white bg-opacity-30 backdrop-blur-lg w-full lg:w-2/3 p-6 shadow-md rounded-lg transition-opacity duration-300 ${selectedEmployee ? 'opacity-100' : 'opacity-0'}`}>
        {selectedEmployee ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Leave Request Details</h2>
            <p className="text-black"><strong>Name:</strong> {selectedEmployee.name}</p>
            <p className="text-black"><strong>From:</strong> {selectedEmployee.leaveRequest.from}</p>
            <p className="text-black"><strong>To:</strong> {selectedEmployee.leaveRequest.to}</p>
            <div className="bg-gray-100 p-4 rounded-lg mt-2">
              <p className="text-black"><strong>Reason for Leave:</strong></p>
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 mb-4" 
                rows="4" 
                readOnly
                value={selectedEmployee.leaveRequest.reason}
              />
            </div>
            <p><strong>Documentation:</strong></p>
            <a href="#" className="text-blue-500 hover:underline">{selectedEmployee.leaveRequest.documentation}</a>

            <div className="mt-4 flex justify-between">
              <button 
                onClick={handleAccept} 
                className="bg-[#1D5C96] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Accept
              </button>
              <button 
                onClick={handleDecline} 
                className="bg-[#1D5C96] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Decline
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">Select an employee to view leave request details.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestPage;