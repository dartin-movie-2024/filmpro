import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Director from './components/Director';
import ResponseContext from './components/ResponseContext';
import AssistantDirector from './components/AssistantDirector';


function App() {
  const [sceneshootData, setsceneshootData]=useState({});
  return (
    <ResponseContext.Provider value={{ responseData: sceneshootData , setResponseData: (obj) => {
      setsceneshootData(obj);
    } }}>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/director" element={<Director />} />
          <Route path="/dashboard/ad" element={<AssistantDirector />} />
        </Route>
      </Routes>
    </Router>
    </ResponseContext.Provider>
  );
}

export default App;
