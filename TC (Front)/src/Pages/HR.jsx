import { useState } from 'react';
import SideBarHr from '../Components/HR/SideBarHr';
import LeaveRequest from '../Components/HR/LeaveRequestHr';
import AccountProfile from '../Components/HR/Account_infoHr';
import EditProfile from '../Components/HR/EditProfileHr';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHR from '../Components/HR/DashboardHR';
import EmployeesHr from '../Components/HR/EmployeesHr';
import AddTaskPage from '../Components/HR/AssignTasks';
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
            return <DashboardHR/>;
        case "Employees":
            return <EmployeesHr />;
        case "AssignTasks":
            return <AddTaskPage/>
        default:
            return <DashboardHR/>;
        }
    }
    console.log(activeTab);
    return (
        <Router> 
        <div className="flex align-items-center justify-content-center  w-full space-between" >
          <SideBarHr setActiveTab={setActiveTab}/>
          <div className=" align-items-center justify-content-center w-full space-between">

            {tabToRender()}
          </div>
       
        
        </div>
        </Router> 
    
        
    );
}

export default Employee