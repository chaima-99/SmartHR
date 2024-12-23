import { useState } from 'react';
import SideBarAD from '../Components/Admin/SideBarAD';
import DashboradAD from '../Components/Admin/DashboradAD';
import UserForm from '../Components/Admin/CreateAccount';
const Employee = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    function tabToRender() {
        switch (activeTab) {
        case "dashboard":
            return <DashboradAD/>
        case "createAccount":
            return <UserForm/>
        default:
            return <DashboradAD/>
        }
    }
    console.log(activeTab);
    return (
        <div className="flex align-items-center justify-content-center  w-full space-between" >
          <SideBarAD setActiveTab={setActiveTab}/>
          <div className=" align-items-center justify-content-center w-full space-between">

            {tabToRender()}
          </div>
       
        
        </div>
    
        
    );
}

export default Employee