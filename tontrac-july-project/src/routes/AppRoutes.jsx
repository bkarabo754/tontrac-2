// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import { NavigationProvider } from "@/context/NavigationContext";

function App() {
  return (
    <NavigationProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/user/:userId' element={<UserPage />} />
        <Route path='/edit-user/:userId' element={<EditUser />} />
      </Routes>
    </NavigationProvider>
  );
}

export default App;
