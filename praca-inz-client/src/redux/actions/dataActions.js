import {
  SET_ALLOYS,
  SET_PROPS,
  LOADING_DATA,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_DATA,
  SET_GROUPS,
  SET_ALLOY,
  SET_ELEMS,
  LOADING_ELEMS,
  LOADING_GROUPS,
  LOADING_PROPS
} from '../types';
import axios from 'axios';

// Get all alloys
export const getAlloys = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/show')
    .then((res) => {
      dispatch({
        type: SET_ALLOYS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALLOYS,
        payload: []
      });
    });
};

// Get all alloys
export const getSearchedAlloys = (body) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post('/search', body)
    .then((res) => {
      dispatch({
        type: SET_ALLOYS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALLOYS,
        payload: []
      });
    });
};

// Get all props
export const getProps = () => (dispatch) => {
  dispatch({ type: LOADING_PROPS });
  axios
    .get('/getProps')
    .then((res) => {
      dispatch({
        type: SET_PROPS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PROPS,
        payload: []
      });
    });
};

// Get all props
export const getGroups = () => (dispatch) => {
  dispatch({ type: LOADING_GROUPS });
  axios
    .get('/getGroups')
    .then((res) => {
      dispatch({
        type: SET_GROUPS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_GROUPS,
        payload: []
      });
    });
};

// Get all props
export const getElements = () => (dispatch) => {
  dispatch({ type: LOADING_ELEMS });
  axios
    .get('/getElements')
    .then((res) => {
      dispatch({
        type: SET_ELEMS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ELEMS,
        payload: []
      });
    });
};

export const getAlloy = (alloy_name) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/showDetails/${alloy_name}`)
    .then((res) => {
      dispatch({
        type: SET_ALLOY,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (email) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${email}`)
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: SET_DATA,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
