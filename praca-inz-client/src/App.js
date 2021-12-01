
import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Search from './pages/search';
import Add from './pages/add';

const theme = createTheme({
  palette: {
    primary: {
      light: '#354649',
      main: '#433E49',
      dark: '#121C27',
      contrastText: '#fff',
    },
    secondary: {
      light: '#575F68',
      main: '#384959',
      dark: '#292534',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
         <div className="App">
        <Router>
        <Navigation />
          <div className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login  />} />
                <Route path="/register" element={<Register  />} />
                <Route path="/search" element={<Search  />} />
                <Route path="/add" element={<Add  />} />
            </Routes>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
