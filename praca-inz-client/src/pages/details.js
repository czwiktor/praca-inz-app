import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import AlloyDetails from '../components/AlloyDetails';

import { connect } from 'react-redux';
import { getAlloy } from '../redux/actions/dataActions';
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
        this.props.getAlloy(3);
    }

    render() {

        const { alloys, loading } = this.props.data;
        let alloyMarkup  = !loading ? (
          alloys.map((alloy) => <Grid className='alloys__item' item xs={6} md={6} lg={4}> <AlloyDetails className='alloys__content' key={alloy.id} alloy={alloy} /> </Grid> )
        ) : ( <Skeleton />  );

        return (
            <Box className="alloys" sx={{ flexGrow: 1 }}>
                <Typography variant="h2" className='header'>
                        Stop aluminium
                </Typography>

                <Grid className="alloys__container" container spacing={5}>
                    {alloyMarkup}
                </Grid>
            </Box>
        );
    }
}

home.propTypes = {
    getAlloy: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});
  
export default connect(
mapStateToProps,
{ getAlloy }
) (withStyles(styles)(home));