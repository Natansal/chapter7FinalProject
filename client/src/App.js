import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import Info from "./pages/info";
import ChangeInfo from "./pages/changeInfo";

export const AppContext = createContext();

export default function App() {
   const [user, setUser] = useState(null);
   return (
      <Routes>
         <Route
            path="/users/:user_id/info"
            element={<Info />}
         />
         <Route
            path="/users/:user_id/change_info"
            element={<ChangeInfo />}
         />
      </Routes>
   );
}
