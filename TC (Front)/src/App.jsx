import React from 'react';
import Loginpage from './Pages/Login_page';
import Admin from './Pages/Admin';
import Employee from './Pages/Employee';
import HR from './Pages/HR';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </Router>
  );
};
export default App;