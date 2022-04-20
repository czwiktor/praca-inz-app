import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Img
import NoImg from '../media/no-img.png';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { withRouter } from '../components/withRouter';

const styles = (theme) => ({
  ...theme.spreadIt
});

class Profile extends Component {

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        credentials: { email, role, createdAt, name },
        access,
        authenticated
      }
    } = this.props;

    let accessMarkup = [];
    if (access) {
      for (let [key, value] of Object.entries(access)) {
        if (key !== 'id') accessMarkup.push(` ${key} = ${value ? 'Tak' : 'Nie'}`)
      };
    }

    let profileMarkup =
      authenticated ? (
        <div className='user-profile'>
            <div className="user-profile__image-wrapper">
              <img src={NoImg} alt="profile" className="user-profile__profile-image" />
            </div>
            <hr />
            <div className="user-profile__profile-details">
              <div className="user-profile__item">
                <Typography variant="body2">  E-mail:  </Typography>
                <a href={`mailto:${email}`} variant="h5">
                  {email}
                </a>
              </div>
              <hr />
              <div className="user-profile__item">
                {name && <Typography variant="body2"> Nazwa użytkownika: {name}</Typography>}
              </div>
              <hr />
              <div className="user-profile__item">
                {role && (
                  <Typography variant="body2">
                    Rola: {role}
                  </Typography>
                )}
              </div>
              <hr />
              <div className="user-profile__item">
                {access && (
                  <ul>Uprawnienia:
                    {accessMarkup.map((role) => <li> {role} </li>)}
                  </ul>
                )}
              </div>
              <hr />
              <span>Dołączył: {dayjs(createdAt).format('MMM YYYY')}</span>
              <div className="user-profile__button">
                <MyButton tip="Logout" onClick={this.handleLogout}>
                  Wyloguj
                </MyButton>
              </div>
            </div>
        </div>
      ) : (
        <div className='user-profile'>
          <Typography className="user-profile__error" variant="body2" align="center">
            Brak profilu, spróbuj zalogować się ponownie lub utwórz nowe konto.
          </Typography>
          <div className='user-profile__profile-details'>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Rejestracja
            </Button>
          </div>
        </div>
      )
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile)));
