import './App.css'
import { Routes, Route , Navigate } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Info from './pages/Info';
import NavBar from './pages/NavBar';
import Albums from './pages/Albums';
import ToDos from './pages/ToDos';
import Posts from './pages/Posts';


export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  
  return (
    <h1></h1>
  );
}

