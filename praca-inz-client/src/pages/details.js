import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from '../components/withRouter';

import AlloyDetails from '../components/AlloyDetails';
import Skeleton from '../components/Skeleton';

import { connect } from 'react-redux';
import { getAlloy } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadIt
});

const notAuthMarkup = (<> <div className="alert-modal"> <h2> Brak uprawnień. </h2>
    <p> Zawartość dostępna tylko dla zalogowanych użytkowników, z odpowiednimi uprawnieniami. </p> </div> 
</>);

class details extends Component {
    constructor(props) {
        super(props);
    };

    state = {
        alloy: null
    };

    componentDidMount () {
        this.props.getAlloy(this.props.params.alloy_name);
    };
    
    render() {
        const { alloy, loading } = this.props.data;
        const { authenticated } = this.props.user;

        let alloyMarkup  = !loading ? (
          alloy.map((alloy) => <AlloyDetails className='alloys__content' key={alloy.id} alloy={alloy} />)
        ) : ( <Skeleton />  );

        return (
            <>
                {authenticated ? alloyMarkup : notAuthMarkup}
            </>
        );
    };
}

details.propTypes = {
    getAlloy: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    authenticated: state.user.authenticated
});
  
export default withRouter(connect(
mapStateToProps,
{ getAlloy }
) (withStyles(styles)(details)));