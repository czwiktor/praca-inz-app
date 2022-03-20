import React, { Component } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import AlloyDetails from '../components/AlloyDetails';
import Skeleton from '../components/Skeleton';

class home extends Component {
    state = {
        alloys: null
    }

    componentDidMount () {
        axios
            .get('/showDetails/24')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    alloys: res.data
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        let alloysMarkup = this.state.alloys ? (this.state.alloys.map((alloy) => <AlloyDetails key={alloy.id} alloy={alloy} />))  : <Skeleton /> ;

        return (
            <Box sx={{ flexGrow: 1 }}>
                {alloysMarkup}
            </Box>
        );
    }
}

export default home;