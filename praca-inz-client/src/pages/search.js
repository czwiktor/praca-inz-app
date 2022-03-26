import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alloy from '../components/Alloy';
import Slider from '@mui/material/Slider';
import Skeleton from '../components/Skeleton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { getSearchedAlloys, getProps, getElements } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';

const styles = (theme) => ({
    ...theme.spreadIt
});

function valuetext(value) {
    return `${value}`;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function MultipleSelectCheckmarks (elements) {
  const [elementName, setElementName] = React.useState([]);
  elements = elements.elements;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Pierwiastki chemiczne</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={elementName}
          onChange={handleChange}
          input={<OutlinedInput label="Pierwiastki chemiczne" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {elements.map((element) => (
            <MenuItem key={element.element_id} value={element.name_short}>
              <Checkbox checked={elementName.indexOf(element.name_short) > -1} />
              <ListItemText primary={element.name_long} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export function RangeSlider(prop) {
    let property = prop.prop;
    const name = property.prop_name;
    const unit = property.prop_unit;
    const id = property.prop_id;
    const [value, setValue] = React.useState([0, 500]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: 300 }}>
        <div class="search-queries__text">
            <span>  <b> Właściwość: </b> {name} </span> 
            <span> <b> Jednostka: </b> {unit}</span>
        </div>
        
        <Slider 
          key={id}
          getAriaLabel={() => `${name}`}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="yes"
          getAriaValueText={valuetext}
        />
      </Box>
    );
}

class compQuery {
    constructor (query) {
        this.Al = {
            min: query.Al.min,
            max: query.Al.max
        };
        this.Cu = {
            min: query.Cu.min,
            max: query.Cu.max
        };
        this.Fe = {
            min: query.Fe.min,
            max: query.Fe.max
        };
        this.Mg = {
            min: query.Mg.min,
            max: query.Mg.max
        };
        this.Ni = {
            min: query.Ni.min,
            max: query.Ni.max
        };
        this.Si = {
            min: query.Si.min,
            max: query.Si.max
        };
        this.Zn = {
            min: query.Zn.min,
            max: query.Zn.max
        };
    }
}

class propsQuery {
    constructor (query) {
        this['R0,2'] = {
            min: query['R0,2'].min,
            max: query['R0,2'].max 
        };
        this['Rm'] = {
            min: query['Rm'].min,
            max: query['Rm'].max
        };
        this['A5'] = {
            min: query['A5'].min,
            max: query['A5'].max
        };
        this['HB'] = {
            min: query['HB'].min,
            max: query['HB'].max
        };
    }
}

class search extends Component {
    constructor() {
        super();
        this.state = {
            alloys: null,
            propses: null,
            elements: null
        };

        // const query = {
        //     group: this.state.group,
        //     composition: this.state.composition,
        //     propses: this.state.properties
        // };
    }

    componentDidMount () {
        this.props.getSearchedAlloys();
        this.props.getProps();
        this.props.getElements();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const query = {
            group: this.state.group,
            composition: this.state.composition,
            propses: this.state.properties
        };

        this.props.getSearchedAlloys(query);
    };

    render() {
        const { alloys, loading1, propses, loading2, elements, loading3 } = this.props.data;
        let count = alloys.length;
        
        let alloysMarkup = alloys.map((alloy) => <Grid item xs={6} md={6} lg={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid> )
        let propsMarkup = propses.map((prop) => <div> <RangeSlider key={prop.id} prop={prop} /> </div> )
        let elementsMarkup = <div> <MultipleSelectCheckmarks elements={elements} /> </div>
        let loading = loading1 && loading2 && loading3;

        let finalMarkup = !loading ? (
            <>
                <div className="search-queries">
                    <h1> Kryteria wyszukiwania: </h1>
                    <div className="search-queries__item">
                        <h2> Właściwości mechaniczne </h2>
                        <div class="props-container__selects">
                            {propsMarkup}
                        </div>

                        <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                    </div>
                    <div className="search-queries__item">
                        <h2> Występowanie pierwiastków chemicznych </h2>
                        <div class="props-container__selects">
                            {elementsMarkup}
                        </div>

                        <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                    </div>
                    <div className="search-queries__item">
                        <h2> Grupy stopów </h2>
                        <div class="props-container__selects">
                            {elementsMarkup}
                        </div>
                        <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                    </div>
                    <div className="search-queries__form">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className='search-queries__button'
                            disabled={loading}
                            >
                            Wyszukaj
                            {loading && (
                                <CircularProgress size={30} className="progress" />
                            )}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="search-results">
                    <div className="search-results__header">
                        <h1> Wyniki wyszukiwania ({count}): </h1>
                    </div>
                    <Grid container spacing={2}>
                        {alloysMarkup}
                    </Grid>
                </div>
               
            </>
        ) : ( 
            <Skeleton /> 
        );

        return (
            <Box sx={{ flexGrow: 1 }}>
                {finalMarkup}
            </Box>
        );
    }
}

search.propTypes = {
    getProps: PropTypes.func.isRequired,
    getSearchedAlloys: PropTypes.func.isRequired,
    getElements: PropTypes.func.isRequired,
    propses: PropTypes.object.isRequired,
    alloys: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getSearchedAlloys,
    getElements,
    getProps
};

export default connect( mapStateToProps, mapActionsToProps) (withStyles(styles) (search));