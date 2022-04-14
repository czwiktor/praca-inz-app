import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
// MUI stuff

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons

import NoImg from '../media/no-img.png';

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

const ProfileSkeleton = () => {
  return (
    <Paper className='user-profile'>
      <div className="user-profile__image-wrapper">
        <img src={NoImg} alt="profile" className="user-profile__profile-image" />
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