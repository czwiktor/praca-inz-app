import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class home extends Component {
    state = {
        alloys: null
    }
    componentDidMount () {
        axios.get('/show')
            .then( res => {
                console.log(res.data);
                this.setState({
                    alloys: res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        let alloysMarkup = this.state.alloys ? (this.state.alloys.map(alloy => <p> {alloy.name} </p>))  : <p> Loading.. </p>;

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>xs=8 {alloysMarkup}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4 {alloysMarkup}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4 {alloysMarkup}</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8 {alloysMarkup}</Item>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default home;