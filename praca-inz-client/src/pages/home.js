import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alloy from '../components/Alloy';

import { connect } from 'react-redux';
import { getAlloys } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';
import Skeleton from '../components/Skeleton';

const styles = (theme) => ({
    ...theme.spreadIt
  });

class home extends Component {
    state = {
        alloys: null
    }

    componentDidMount () {
        this.props.getAlloys();
    }

    render() {

        const { alloys, loading } = this.props.data;
        let alloysMarkup  = !loading ? (
          alloys.map((alloy) =>   <Grid item xs={6} md={6} lg={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid> )
        ) : ( <Skeleton />  );

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {alloysMarkup}
                </Grid>
            </Box>
        );
    }
}

home.propTypes = {
    getAlloys: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});
  
export default connect(
mapStateToProps,
{ getAlloys }
) (withStyles(styles)(home));