import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons

import NoImg from '../media/no-img.png';
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

//Redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../redux/actions/userActions';
import { withRouter } from '../components/withRouter';

const styles = (theme) => ({
  ...theme.spreadIt,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
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
        Adres e-mail: 
        <MuiLink component={Link} to={`/user`} color="primary" variant="h5">
          brak
        </MuiLink>
        <hr />
        <Typography variant="body2">Nazwa użytkownika </Typography>
        <hr />
        
        <Fragment>
          Rola:
          <hr />
        </Fragment>
        
        {/* <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span> */}
      </div>
      <div className="user-profile__button">
        <MyButton tip="Logout" disabled>
            -----
        </MyButton>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);