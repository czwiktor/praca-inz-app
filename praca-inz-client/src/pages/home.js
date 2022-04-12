import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getAlloys } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';

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
        return (
            <Box className="home" sx={{ flexGrow: 1 }}>
                <Typography variant="h2" className='header-text'>
                    Dobieranie stopów aluminium
                </Typography>

                <Typography variant="body2" className='home__text'>
                    Aplikacja mająca na celu umożliwić studentom, technologom, pracownikom naukowym jak i każdemu zainteresowanemu dobrać odpowiednie stopy aluminium wedle zadanych kryteriów, tj:
                    <ul>
                        <li>
                            Występowanie pierwiastków chemicznych (określenie czy dany pierwiastek występuje w składzie danego stopu)
                        </li>

                        <li>
                            Przynależność do danej grupy stopów (okreslenie dominującego pierwiastka)
                        </li>

                        <li>
                            Parametry wytrzymałościowe danego stopu (Wytrzymałość na ściskanie, wytrzymałość na rozciąganie, wydłużenie oraz twardość).
                        </li>
                    </ul>

                    Aplikacja na podstawie ww. kryteriów zwraca z bazy danych odpowiadające im stopy (o ile takie się znajdują).
                </Typography>
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