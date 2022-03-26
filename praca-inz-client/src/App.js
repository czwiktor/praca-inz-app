
import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import themeObject from './util/theme';

// Theme
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

import jwtDecode from 'jwt-decode';

// Pages
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Search from './pages/search';
import User from './pages/user';
import Details from './pages/details';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import axios from 'axios';

const theme = createTheme(themeObject);

axios.defaults.baseURL = 'https://europe-west1-praca-inz-cf3bb.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navigation  />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="search" element={<Search/>} />
                <Route path="search/:params" element={<Search/>} />
                <Route path="users/:handle" element={<User/>} />
                <Route path="showDetails/:alloy_name" element={<Details/>} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
