import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link, useParams } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AlloyDetails from '../components/AlloyDetails';
import Skeleton from '../components/Skeleton';

import { connect } from 'react-redux';
import { getAlloy } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadIt
});

class details extends Component {
    state = {
        alloy: null
    }

    componentDidMount () {
        this.props.getAlloy('AlCu4MgTi');
    }

    render() {
        console.log(this.props.data);
        const { alloy, loading } = this.props.data;

        let alloyMarkup  = !loading ? (
          alloy.map((alloy) => <Grid className='alloys__item' item xs={6} md={6} lg={4}> <AlloyDetails className='alloys__content' key={alloy.id} alloy={alloy} /> </Grid> )
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

details.propTypes = {
    getAlloy: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});
  
export default connect(
mapStateToProps,
{ getAlloy }
) (withStyles(styles)(details));