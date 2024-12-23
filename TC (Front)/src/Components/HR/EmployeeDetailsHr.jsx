import React from "react";
import { useParams, useLocation } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const location = useLocation();
  const employee = location.state; // Retrieve employee data passed through Link

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Status:</strong> {employee.status}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
