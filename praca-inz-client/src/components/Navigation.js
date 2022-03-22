import React, { Component} from 'react';
import { Link }  from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navigation extends Component {
    render() {
        const { authenticated } = this.props;
        const userDataButtons = !authenticated ? ( <> <Button className="nav-container__btn" color="inherit" component={Link} to="/login"> Logowanie </Button> <Button className="nav-container__btn" color="inherit" component={Link} to="/register"> Rejestracja </Button> </> )
        : ( <Button className="nav-container__btn" color="inherit" component={Link} to="/user/:user_id"> Profil </Button>)
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


Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navigation);