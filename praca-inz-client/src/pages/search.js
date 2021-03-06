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
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getSearchedAlloys, getProps, getElements, getGroups } from '../redux/actions/dataActions';
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
  groups: [],
  properties: {},
  composition: []
}

function MultipleSelectElements (elements) {
  const [elementName, setElementName] = React.useState([]);
  let elems = elements.elements;
    
  const handleChange = (event) => {
    const { target: { value } } = event;
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

function MultipleSelectGroup (groups) {
  const [groupName, setElementName] = React.useState([]);
  groups = groups.groups;
    
  const handleChange = (event) => {
    const { target: { value } } = event;
    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    params.groups = value;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Grupy stop??w</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          name='group'
          multiple
          value={groupName}
          onChange={handleChange}
          input={<OutlinedInput label="Grupy stop??w" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {groups.map((element) => (
            <MenuItem key={element.id} value={element.name}>
              <Checkbox checked={groupName.indexOf(element.name) > -1} />
              <ListItemText primary={element.name} />
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
        <span>  <b> W??a??ciwo????: </b> {name} </span> 
        <span> <b> Jednostka: </b> {unit}</span>
      </div>
      
      <Slider 
        key={id}
        getAriaLabel={() => `${name}`}
        value={value}
        max={500}
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
        groups: null
      };
    }

    componentDidMount () {
      this.props.getProps();
      this.props.getElements();
      this.props.getGroups();
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if (!params.composition.length && !params.groups.length && !Object.keys(params.properties).length) {
        return;
      }

      this.props.getSearchedAlloys(params);
    };

    handleSubmitAll = (event) => {
      event.preventDefault();
      this.props.getSearchedAlloys();
    };

    render() {
      const { alloys, loading, propses, loadingProps, elements, loadingElements, groups, loadingGroups } = this.props.data;
      const { authenticated, access } = this.props.user;
      const count = alloys.length;
      const compString = 'composition';
      const propString = 'properties';
      const groupString = 'group';

      const notAuthMarkup = (<> <div className="alert-modal"> <h2> Uwaga </h2>
        <p> Zawarto???? dost??pna tylko dla zalogowanych u??ytkownik??w. </p> </div> 
      </>);
      const notAllowedMarkup = (<> <div className="alert-modal"> <h2> Brak uprawnie??. </h2>
        <p> Popro??  o poszerzenie dost??p??w lub zaloguj si?? na inne konto. </p> </div> 
      </>);

      let allowedSearch = access ? access.search  : '';
      let allowedShowAll =  access ? access.seeAll  : '';

      let alloysMarkup = !loading ? alloys.map((alloy) => <Grid item xs={12} md={4}> <Alloy key={alloy.id} alloy={alloy} /> </Grid>)  : <Skeleton /> 

      let propsMarkup = !loadingProps ? propses.map((prop) => <Grid item xs={12} md={8}> <RangeSlider key={prop.id} prop={prop} named={propString} /> </Grid> )  : <Skeleton /> 
      let elementsMarkup = !loadingElements ? <Grid item xs={12} md={8}> <MultipleSelectElements elements={elements} named={compString} /> </Grid>  : <Skeleton /> 
      let groupMarkup = !loadingGroups ? <Grid item xs={12} md={8}> <MultipleSelectGroup groups={groups} named={groupString} /> </Grid>  : <Skeleton /> 
      
      let finalMarkup = authenticated ? <>
              <div className="search-queries">
                <Typography variant="h2" className='header-text'>
                    Wyszukiwanie stop??w aluminium
                </Typography>
                <h1> Kryteria wyszukiwania: </h1>
                <div className="search-queries__item">
                    <h2> W??a??ciwo??ci mechaniczne </h2>
                    <div className="search-queries__selects">
                        {propsMarkup}
                    </div>
                    <span className="search-queries__help"> W przypadku nie wybrania ??adnego z element??w, kryterium jest pomijane </span>
                </div>
                <div className="search-queries__item">
                    <h2> Wyst??powanie pierwiastk??w chemicznych </h2>
                    <div className="search-queries__selects">
                        {elementsMarkup}
                    </div>
                    <span className="search-queries__help"> W przypadku nie wybrania ??adnego z element??w, kryterium jest pomijane </span>
                </div>
                <div className="search-queries__item">
                    <h2> Grupy stop??w </h2>
                    <div className="search-queries__selects">
                        {groupMarkup}
                    </div>
                    <span className="search-queries__help"> W przypadku nie wybrania ??adnego z element??w, kryterium jest pomijane </span>
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
                        {allowedSearch ? 'Wyszukaj' : 'Brak uprawnie?? - Wyszukaj'}
                        </Button>
                    </form>

                    <form noValidate onSubmit={this.handleSubmitAll}>
                        <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className='search-queries__button'
                        disabled={loading || !allowedShowAll}
                        >
                        {allowedShowAll ? 'Poka?? wszystkie' : 'Brak uprawnie?? - Poka?? wszystkie'}
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
          </>
          : notAuthMarkup
      ;

      return (
        <Box className="search" sx={{ flexGrow: 1 }}>
            {allowedSearch ? finalMarkup : notAllowedMarkup}
        </Box>
      );
    }
}

search.propTypes = {
  getProps: PropTypes.func.isRequired,
  getSearchedAlloys: PropTypes.func.isRequired,
  getElements: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  composition: state.composition,
  properties: state.properties,
  propses: state.propses,
  groups: state.groups,
  data: state.data,
  user: state.user,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  getSearchedAlloys,
  getElements,
  getGroups,
  getProps
};

export default connect( mapStateToProps, mapActionsToProps) (withStyles(styles) (search));