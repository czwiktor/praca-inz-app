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
  group: [],
  properties: {},
  composition: []
}

function MultipleSelectElements (elements) {
  const [elementName, setElementName] = React.useState([]);
  let elems = elements.elements;
    
  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    params.composition = value;
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
          {elems.map((element) => (
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

function MultipleSelectGroup (elements) {
  const [elementName, setElementName] = React.useState([]);
  elements = elements.elements;
    
  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    params.group = value;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Grupy stopów</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name='group'
          multiple
          value={elementName}
          onChange={handleChange}
          input={<OutlinedInput label="Grupy stopów" />}
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

function RangeSlider (prop) {
  let property = prop.prop;
  const name = property.prop_name;
  const unit = property.prop_unit;
  const id = property.prop_id;
  const [value, setValue] = React.useState([0, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let itemObj = {};
    itemObj[name] = newValue;

    params.properties[name] = {
      min: newValue[0],
      max: newValue[1]
    };
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className="search-queries__text">
        <span>  <b> Właściwość: </b> {name} </span> 
        <span> <b> Jednostka: </b> {unit}</span>
      </div>
      
      <Slider 
        key={id}
        getAriaLabel={() => `${name}`}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

class search extends Component {
    constructor() {
      super();
      this.state = {
        alloys: null,
        propses: null,
        elements: null,
        group: null
      };
    }

    componentDidMount () {
      this.props.getSearchedAlloys();
      this.props.getProps();
      this.props.getElements();
    }

    handleSubmit = (event) => {
      event.preventDefault();

      console.log(params);
      this.props.getSearchedAlloys(params);
    };

    render() {
      const { alloys, loading1, propses, loading2, elements, loading3 } = this.props.data;
      const { authenticated, access } = this.props.user;
      const count = alloys.length;
      const compString = 'composition';
      const propString = 'properties';
      const groupString = 'group';

      const notAuthMarkup = (<> <div className="alert-modal"> <h2> Uwaga </h2>
        <p> Zawartość dostępna tylko dla zalogowanych użytkowników. </p> </div> 
      </>);
      const notAllowedMarkup = (<> <div className="alert-modal"> <h2> Brak uprawnień. </h2>
        <p> Poproś  o poszerzenie dostępów lub zaloguj się na inne konto. </p> </div> 
      </>);
      let loading = loading1 && loading2 && loading3;
      let allowedSearch = access ? access.search : '';
      let allowedShowAll =  access ? access.showAll : '';
      
      let alloysMarkup = alloys.map((alloy) => <Grid item xs={12} md={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid> )

      let propsMarkup = propses.map((prop) => <Grid item xs={12} md={8}> <RangeSlider key={prop.id} prop={prop} named={propString} /> </Grid> )
      let elementsMarkup = <Grid item xs={12} md={8}> <MultipleSelectElements elements={elements} named={compString} /> </Grid>
      let groupMarkup = <Grid item xs={12} md={8}> <MultipleSelectGroup elements={elements} named={groupString} /> </Grid>
      
      let finalMarkup = !loading ? (
          authenticated ? (<>
              <div className="search-queries">
                  <Typography variant="h2" className='header-text'>
                      Wyszukiwanie stopów aluminium
                  </Typography>
                  <h1> Kryteria wyszukiwania: </h1>
                  <div className="search-queries__item">
                      <h2> Właściwości mechaniczne </h2>
                      <div className="search-queries__selects">
                          {propsMarkup}
                      </div>

                      <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                  </div>
                  <div className="search-queries__item">
                      <h2> Występowanie pierwiastków chemicznych </h2>
                      <div className="search-queries__selects">
                          {elementsMarkup}
                      </div>

                      <span className="search-queries__help"> W przypadku nie wybrania żadnego z elementów, kryterium jest pomijane </span>
                  </div>
                  <div className="search-queries__item">
                      <h2> Grupy stopów </h2>
                      <div className="search-queries__selects">
                          {groupMarkup}
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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  composition: state.composition,
  properties: state.properties,
  propses: state.propses,
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