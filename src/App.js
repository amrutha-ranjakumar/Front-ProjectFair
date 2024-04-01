import logo from './logo.svg';
import './App.css';
import Footer from './compontents/Footer';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import {  Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './compontents/Header';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';


function App() {
  const {isAuthToken, setisAuthToken}=useContext(isAuthTokenContext)
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register={"register"} />}/>
        <Route path='/project' element={<Project />}/>
        <Route path='/dashboard' element={isAuthToken?<Dashboard/>:<Home/>}/>

      </Routes>
      <Footer />
    </div>

  );
}

export default App;
