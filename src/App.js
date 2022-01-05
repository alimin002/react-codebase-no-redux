import { Table, Divider, Tag,Button } from 'antd';
import 'antd/dist/antd.css'
import React, { useState, useEffect } from 'react';


//page component zone
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import List_registered_user from './pages/dashboard/List_registered_users';
import List_visitors from './pages/dashboard/List_visitors';
import Change_password from './pages/configuration/Change_password';
import Profile from './pages/profile/Profile';
import { BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {

  var username= localStorage.getItem('username');

  const handleLogout =(e) => {
    //e.preventDefault();
    localStorage.clear();
    window.location.reload();
    //alert("button handled")
  };
  
  if(localStorage.getItem('username')==null){
    return (
      <>
        <Login/>
      </>
    );
  }else{
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="change_password" element={<Change_password />} />
            <Route path="list_registered_user" element={<List_registered_user />} />
            <Route path="list_visitors" element={<List_visitors />} />
            <Route path="profile" element={<Profile />} />
        </Routes> 
      </BrowserRouter>
      
    );
  }
  
}

export default App;
