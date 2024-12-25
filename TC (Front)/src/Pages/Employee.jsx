import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EmployeeProfile from '../Components/Employee/Employee_Dashboard/Employee_Dashboard';
import Sidebar from '../Components/Employee/Sidebar';
import LeaveRequest from '../Components/Employee/Leave_request/LeaveRequest';
import AccountProfile from '../Components/Employee/Account_info';
import EditProfile from '../Components/Employee/EditProfile';

const Employee = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // Gérer les changements d'onglets
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Naviguer vers la route appropriée
    switch (tab) {
      case 'accountInfo':
        navigate('/employee/accountInfo');
        break;
      case 'editProfile':
        navigate('/employee/editProfile');
        break;
      case 'leaveRequest':
        navigate('/employee/leaveRequest');
        break;
      case 'dashboard':
      default:
        navigate('/employee/dashboard');
        break;
    }
  };

  return (
    <div className="flex align-items-center justify-content-center w-full space-between">
      <Sidebar setActiveTab={handleTabChange} />
      <div className="align-items-center justify-content-center w-full space-between">
        {/* Routes pour chaque onglet */}
        <Routes>
          <Route path="/dashboard" element={<EmployeeProfile />} />
          <Route path="/accountInfo" element={<AccountProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/leaveRequest" element={<LeaveRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default Employee;
