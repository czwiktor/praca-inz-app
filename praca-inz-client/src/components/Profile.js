import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
import ProfileSkeleton from './ProfileSkeleton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons

import NoImg from '../media/no-img.png';

import LinkIcon from '@mui/icons-material/Link';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';

//Redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../redux/actions/userActions';
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
      classes,
      user: {
        credentials: { email, role, createdAt, name },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className='user-profile'>
            <div className="user-profile__image-wrapper">
              <img src={NoImg} alt="profile" className="user-profile__profile-image" />
              {/* <input
                type="file"
                id="imageInput"
                hidden="hidden"
              />
              <MyButton
                tip="Edit profile picture"
                btnClassName="button"
              >
              </MyButton> */}
            </div>
            <hr />
            <div className="user-profile__profile-details">
              <div className="user-profile__item">
                <LinkIcon/> <Typography variant="body2">  E-mail:  </Typography>
                <MuiLink component={Link} to={`/user/${email}`} color="primary" variant="h5">
                  {email}
                </MuiLink>
              </div>
              <hr />
              <div className="user-profile__item">
                {name && <Typography variant="body2"> <PersonIcon/> Nazwa użytkownika: {name}</Typography>}
              </div>
              <hr />
              <div className="user-profile__item">
                {role && (
                  <Typography variant="body2">
                    <EngineeringIcon /> Rola: {role}
                  </Typography>
                )}
              </div>
              <hr />
              <div className="user-profile__item">
                {role && (
                  <Typography variant="body2">
                    <EngineeringIcon /> Uprawnienia: {role}
                  </Typography>
                )}
              </div>
              <hr />
              {/* <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span> */}
            </div>
            <div className="user-profile__button">
              <MyButton tip="Logout" onClick={this.handleLogout}>
                Wyloguj
              </MyButton>
            </div>
        </Paper>
      ) : (
        <Paper className='user-profile'>
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
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

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
