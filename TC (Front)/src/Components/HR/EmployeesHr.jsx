import React, { useState } from "react";
import { LineChart } from "@mui/x-charts";

const EmployeesRH = () => {
  const [employees] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      status: "present",
      absences: 2,
      tardiness: 4,
      tasks: 8,
    },
    {
      id: 2,
      name: "Floyd Miles",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      status: "present",
      absences: 1,
      tardiness: 2,
      tasks: 6,
    },
    {
      id: 3,
      name: "Ronald Richards",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      status: "absent",
      absences: 5,
      tardiness: 1,
      tasks: 7,
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee details
  const [showGraph, setShowGraph] = useState(false); // Graph modal visibility

  // Generate graph data for the selected employee
  const graphData = selectedEmployee
    ? [
        { x: "Absences", y: selectedEmployee.absences },
        { x: "Tardiness", y: selectedEmployee.tardiness },
        { x: "Tasks", y: selectedEmployee.tasks },
      ]
    : [];

  return (
    <div className=" min-h-screen bg-gray-100 p-8 lg:ml-64">
      <h1 className="text-3xl font-bold mb-6">All Employees List</h1>

      {/* Employee Table */}
      <div className="mb-8">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    {employee.name}
                  </button>
                </td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    employee.status === "present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {employee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Employee Details or Graph */}
      {selectedEmployee && !showGraph && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Status:</strong> {selectedEmployee.status}</p>
          <div className="mt-4">
            <p><strong>Absences:</strong> {selectedEmployee.absences}</p>
            <p><strong>Tardiness:</strong> {selectedEmployee.tardiness}</p>
            <p><strong>Tasks Assigned:</strong> {selectedEmployee.tasks}</p>
          </div>

          {/* Detailed State Button aligned to the right */}
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowGraph(true)} // Show graph
            >
              Detailed State
            </button>
          </div>
        </div>
      )}

      {/* Graph View */}
      {selectedEmployee && showGraph && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Employee Statistics</h2>
          {graphData.length > 0 ? (
            <LineChart
              xAxis={[{ dataKey: "x", label: "Metric" }]}
              series={[{ data: graphData, dataKey: "y" }]}
              height={300}
            />
          ) : (
            <p>No data available</p>
          )}

          {/* Return to Details Button */}
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setShowGraph(false)} // Return to employee details
            >
              Return to Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesRH;
