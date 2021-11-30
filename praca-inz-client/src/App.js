import logo from './logo.svg';
import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';


import home from './pages/home';
import register from './pages/register';
import login from './pages/login';
import search from './pages/search';
import add from './pages/add';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="main">
          <Routes>
              <Route path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/register" component={register} />
              <Route path="/search" component={search} />
              <Route path="/add" component={add} />
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
