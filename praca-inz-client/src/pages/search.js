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
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getSearchedAlloys, getProps, getElements } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';

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

let params = {
    group: '',
    composition: [],
    properties: []
}

let itemObj = {};

export function MultipleSelectElements (elements, params) {
  const [elementName, setElementName] = React.useState([]);
  elements = elements.elements;
    
  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    this.setState({ params: { composition: value } });
    console.log('elements selector' + params);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Pierwiastki chemiczne</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name='composition'
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

export function MultipleSelectGroup (elements, params) {
    const [elementName, setElementName] = React.useState([]);
    elements = elements.elements;
      
    const handleChange = (event, params) => {
      const { target: { name, value } } = event;
      setElementName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
        
      this.setState({ params: { group: value } });

      console.log('group selector' + params);
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Pierwiastki chemiczne</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            name='group'
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
    const [params, setProperties] = React.useState({
      properties: {}
    });
    let test = React.useState();
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      itemObj[name] = newValue;

      setProperties(itemObj);

  
      console.log(test);
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
            value: query.Al
        };
        this.Cu = {
            value: query.Cu
        };
        this.Fe = {
            value: query.Fe
        };
        this.Mg = {
            value: query.Mg
        };
        this.Ni = {
            value: query.Ni
        };
        this.Si = {
            value: query.Si
        };
        this.Zn = {
            value: query.Zn
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
            elements: null,
            params: {
              group: '',
              properties: [],
              composition: []
            }
        };
    }

    componentDidMount () {
        this.props.getSearchedAlloys();
        this.props.getProps();
        this.props.getElements();
    }

    handleSubmit = (event) => {
        event.preventDefault();
   
        console.log(this.state.params);
        this.props.getSearchedAlloys(this.state.params);
    };

    render() {
        const { alloys, loading1, propses, loading2, elements, loading3 } = this.props.data;
        const { authenticated } = this.props.user;
        const { access } = this.props.user;

        let count = alloys.length;
        const compString = 'composition';
        const propString = 'properties';
        const groupString = 'group';

        const notAuthMarkup = (<> <div className="alert-modal"> <h2> Uwaga </h2>
          <p> Zawartość dostępna tylko dla zalogowanych użytkowników. </p> </div> 
        </>);

        const notAllowedMarkup = (<> <div className="alert-modal"> <h2> Brak uprawnień. </h2>
          <p> Poproś  o poszerzenie dostępów lub zaloguj się na inne konto. </p> </div> 
        </>);
        
        let alloysMarkup = alloys.map((alloy) => <Grid item xs={12} md={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid> )
        let propsMarkup = propses.map((prop) => <Grid item xs={12} md={8}> <RangeSlider key={prop.id} prop={prop} /> </Grid> )
        let elementsMarkup = <Grid item xs={12} md={8}> <MultipleSelectElements elements={elements} named={compString} /> </Grid>
        let loading = loading1 && loading2 && loading3;
        let allowedSearch = access ? access.search : '';
        let allowedShowAll =  access ? access.showAll : '';

        let finalMarkup = !loading ? (
            authenticated ? (<>
                <div className="search-queries">
                    <Typography variant="h2" className='header-text'>
                        Wyszukiwanie stopów aluminium
                    </Typography>
                    <h1> Kryteria wyszukiwania: </h1>
                    <div className="search-queries__item">
                        <h2> Właściwości mechaniczne </h2>
                        <div class="search-queries__selects">
                            {propsMarkup}
                        </div>

                        <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                    </div>
                    <div className="search-queries__item">
                        <h2> Występowanie pierwiastków chemicznych </h2>
                        <div class="search-queries__selects">
                            {elementsMarkup}
                        </div>

                        <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                    </div>
                    <div className="search-queries__item">
                        <h2> Grupy stopów </h2>
                        <div class="search-queries__selects">
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
                            disabled={loading || !allowedSearch}
                            >
                            {allowedSearch ? 'Wyszukaj' : 'Brak uprawnień - Wyszukaj'}
                            {loading && (
                                <CircularProgress size={30} className="progress" />
                            )}
                            </Button>

                            <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className='search-queries__button'
                            disabled={loading || !allowedShowAll}
                            >
                            {allowedShowAll ? 'Pokaż wszystkie' : 'Brak uprawnień - Pokaż wszystkie'}
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
                    <Grid container spacing={5}>
                        {alloysMarkup}
                    </Grid>
                </div>
               
            </>)
            : notAuthMarkup
        ) : ( 
            <Skeleton /> 
        );

        return (
            <Box className="search" sx={{ flexGrow: 1 }}>
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
    params: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    params: state.params,
    data: state.data,
    user: state.user,
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    getSearchedAlloys,
    getElements,
    getProps
};

export default connect( mapStateToProps, mapActionsToProps) (withStyles(styles) (search));