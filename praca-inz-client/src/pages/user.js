import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import { withRouter } from '../components/withRouter';

class user extends Component {
  state = {
    profile: null
  };

  componentDidMount() {
    const email = this.props.params.email;
    this.props.getUserData(email);
  }

  render() {
    const { userData, loading } = this.props.data;

    return (
      <Grid container spacing={16}>
        <Typography variant="h2" className='header-text'>
          Profil użytkownika
        </Typography>
        <Grid xs={12}>
          {userData === null ? (
            ''
          ) : (
            <Profile props={userData} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default withRouter(connect(
  mapStateToProps,
  { getUserData }
)(user));