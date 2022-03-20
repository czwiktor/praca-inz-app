import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alloy from '../components/Alloy';
import Slider from '@mui/material/Slider';
import Skeleton from '../components/Skeleton';

import { connect } from 'react-redux';
import { getSearchedAlloys, getProps } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';

const styles = (theme) => ({
    ...theme.spreadIt
});

function valuetext(value) {
    return `${value}`;
}
  
export function RangeSlider(prop) {
    const name = prop.prop_name;
    const [value, setValue] = React.useState([0, 500]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => `${name}`}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="yes"
          getAriaValueText={valuetext}
        />
      </Box>
    );
}

class search extends Component {
    state = {
        alloys: null,
        props: null
    }

    componentDidMount () {
        this.props.getSearchedAlloys();
        this.props.getProps();
    }

    render() {
        console.log(this);
        console.log(this.props);
        const { alloys, loading1} = this.props.alloys;
        const { propses, loading2} = this.props.propses;

        let alloysMarkup  = !loading1 ? (
          alloys.map((alloy) => <Grid item xs={6} md={6} lg={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid> )
        ) : ( <Skeleton />  );

        let propsMarkup  = !loading2 ? (
            propses.map((prop) => <Grid item xs={6} md={6} lg={8}> <RangeSlider key={prop.id} prop={prop} /> </Grid> )
        ) : (  <Skeleton /> );

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {propsMarkup}
                </Grid>
                <Grid container spacing={2}>
                    {alloysMarkup}
                </Grid>
            </Box>
        );
    }
}

search.propTypes = {
    getProps: PropTypes.func.isRequired,
    getSearchedAlloys: PropTypes.func.isRequired,
    propses: PropTypes.object.isRequired,
    alloys: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    propses: state.propses,
    alloys: state.alloys
});

export default connect( mapStateToProps, { getProps, getSearchedAlloys }) (withStyles(styles) (search));