import React, { Component} from 'react';
import { Link }  from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser} from '../redux/actions/userActions';

class Navigation extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    let test = this;
    let tes2 = this.props;
    const {
      user: {
        credentials: { email, name},
        authenticated
      }
    }  = this.props;
    const userDataButtons = !authenticated ? ( 
      <> 
        <Button className="nav-container__btn" color="inherit" component={Link} to="/login"> Logowanie </Button> 
        <Button className="nav-container__btn" color="inherit" component={Link} to="/register"> Rejestracja </Button> 
      </>
    )
    : ( 
      <>
        <Button className="nav-container__btn" color="inherit" component={Link} to="/user/:user_id"> Profil: {name} </Button>
        <Button className="nav-container__btn nav-container__btn--logout" tip="Logout" onClick={this.handleLogout}> Wyloguj </Button>
      </>
    )
    
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button className="nav-container__btn" color="inherit" component={Link} to="/">
            Strona Główna
          </Button>
          <Button className="nav-container__btn" color="inherit" component={Link} to="/search">
            Wyszukiwanie
          </Button>
          {userDataButtons}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = { logoutUser};

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated
});

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Navigation);