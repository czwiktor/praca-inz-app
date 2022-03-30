import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alloy from '../components/Alloy';
import Typography from '@material-ui/core/Typography';

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
        console.log(loading);
        const { authenticated } = this.props.user;

        const notAuthMarkup = (<> <div className="alert-modal"> <p> Zawartość dostępna tylko dla zalogowanych użytkowników </p> </div> </>);
        const notAllowed = (<> <div className="alert-modal"> <p> Zawartość dostępna tylko dla zalogowanych użytkowników </p> </div> </>);
        
        let alloysMarkup  = authenticated ? !loading ? alloys.map((alloy) => <Grid className='alloys__item' item xs={12} md={6} lg={4}> <Alloy className='alloys__content' key={alloy.id} alloy={alloy} /> </Grid>) :  <Skeleton />  : notAuthMarkup;
        //alloysMarkup = !notAllowed ? allosMarkup : notAllowedMarkup;

        return (
            <Box className="alloys" sx={{ flexGrow: 1 }}>
                <Typography variant="h2" className='header-text'>
                    Dobieranie stopów aluminium
                </Typography>

                <Typography variant="h4" className='header-text'>
                    Lista wszystkich dostępnych w aplikacji stopów:
                </Typography>

                <Grid className="alloys__container" container spacing={5}>
                    {alloysMarkup}
                </Grid>
            </Box>
        );
    }
}

home.propTypes = {
    getAlloys: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    authenticated: state.user.authenticated
});
  
export default connect(
mapStateToProps,
{ getAlloys }
) (withStyles(styles)(home));