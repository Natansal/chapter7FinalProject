import './App.css'
import { Routes, Route , Navigate } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Info from './components/Info';
import NavBar from './components/NavBar';
import Albums from './components/Albums';
import ToDos from './components/ToDos';
import Posts from './components/Posts';


export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Routes >
        <Route index element={<Navigate replace to ="/Login" />}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path="/Home/:userName" element={<NavBar />}>
          <Route index element={<Home />}></Route>
          <Route path="Info" element={<Info />}></Route>
          <Route path="Albums" element={<Albums />}></Route>
          <Route path="Posts" element={<Posts />}></Route>
          <Route path="Todos" element={<ToDos />}></Route>
        </Route>
        <Route path='*' element={<h1>Error</h1>}></Route>
      </Routes>
    </AppContext.Provider>
  );
}

