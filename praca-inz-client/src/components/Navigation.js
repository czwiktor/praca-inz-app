import React, { Component} from 'react';
import { Link }  from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser} from '../redux/actions/userActions';

import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const mql = window.matchMedia('(max-width: 768px)');
const mobileView = mql.matches;

// if (mobileView) {
//     footerComponent = (
//         <IconButton color="inherit" aria-label="open drawer" className="footer__icon">
//             <MenuIcon />
//         </IconButton>
//     )
// }


class Navigation extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        credentials: { email, name},
        authenticated
      }
    }  = this.props;
    const userDataButtons = !authenticated ? ( 
      <> 
        <Button className="nav-container__btn" color="inherit" component={Link} to="/login"> {mobileView ?  <LoginIcon /> : 'Logowanie' }</Button> 
        <Button className="nav-container__btn" color="inherit" component={Link} to="/register"> {mobileView ? <PersonAddAltIcon /> :  'Rejestracja' }</Button> 
      </>
    )
    : ( 
      <> 
        <div className="nav-container__user-action">
          <Button className="nav-container__btn" color="inherit" component={Link} to={`/user/${email}`}> {mobileView ? <PersonIcon /> :  'Profil:' +  <span> {name} </span> } </Button>
          <Button className="nav-container__btn nav-container__btn--logout" tip="Logout" onClick={this.handleLogout}> {mobileView ? <LogoutIcon /> :  'Wyloguj' } </Button>
        </div>
      </>
    )
    
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button className="nav-container__btn" color="inherit" component={Link} to="/">
            {mobileView ? <HomeIcon /> : 'Strona Główna'} 
          </Button>
          <Button className="nav-container__btn" color="inherit" component={Link} to="/search">
            {mobileView ? <SearchIcon />  : 'Wyszukiwanie'}
          </Button>
          {userDataButtons}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = { logoutUser };

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated
});

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Navigation);