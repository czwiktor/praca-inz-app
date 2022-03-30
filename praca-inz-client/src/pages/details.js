import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withRouter } from '../components/withRouter';

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
    constructor(props) {
        super(props);
    }

    state = {
        alloy: null
    }

    componentDidMount () {
        this.props.getAlloy(this.props.params.alloy_name);
    }

    render() {
        const { alloy, loading } = this.props.data;

        let alloyMarkup  = !loading ? (
          alloy.map((alloy) => <AlloyDetails className='alloys__content' key={alloy.id} alloy={alloy} />)
        ) : ( <Skeleton />  );

        return (
            <>
                {alloyMarkup}
            </>
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
  
export default withRouter(connect(
mapStateToProps,
{ getAlloy }
) (withStyles(styles)(details)));