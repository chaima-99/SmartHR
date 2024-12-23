import { useState } from 'react';
import EmployeeProfile from '../Components/Employee/Employee_Dashboard/Employee_Dashboard';
import Sidebar from '../Components/Employee/Sidebar';
import LeaveRequest from '../Components/Employee/Leave_request/LeaveRequest'
import Account_info from '../Components/Employee/Account_info';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountProfile from '../Components/Employee/Account_info';
import EditProfile from '../Components/Employee/EditProfile';
const Employee = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    function tabToRender() {
        switch (activeTab) {
        case "accountInfo":
            return (
               
                  <Routes>
                    <Route path="/" element={<AccountProfile />} /> 
                    <Route path="/EditProfile" element={<EditProfile />} /> 
                  </Routes>
              );
        case "leaveRequest":
            return <LeaveRequest />;  
        case "dashboard":
            return <EmployeeProfile />;
        default:
            return <EmployeeProfile />;
        }
    }
    console.log(activeTab);
    return (
        <Router> 
        <div className="flex align-items-center justify-content-center  w-full space-between" >
          <Sidebar setActiveTab={setActiveTab}/>
          <div className=" align-items-center justify-content-center w-full space-between">

            {tabToRender()}
          </div>
       
        
        </div>
        </Router>

    
        
    );
}

export default Employee