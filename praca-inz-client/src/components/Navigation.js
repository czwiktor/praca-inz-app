import React, { Component} from 'react';
import { Link }  from 'react-router-dom';

import App from '../App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navigation extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color='inherit' component={Link} to="/"> Home </Button>
                    <Button color='inherit' component={Link} to="/login"> Login </Button>
                    <Button color='inherit' component={Link} to="/search"> Search </Button>
                    <Button color='inherit' component={Link} to="/add"> Add </Button>
                    <Button color='inherit' component={Link} to="/profile"> Profile </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navigation;