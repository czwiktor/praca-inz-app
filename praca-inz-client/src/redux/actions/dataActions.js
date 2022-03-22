import {
  SET_ALLOYS,
  SET_PROPS,
  LOADING_DATA,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_DATA,
  SET_ALLOY,
  SET_ELEMS,
  STOP_LOADING_UI
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
export const getSearchedAlloys = (params) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/queryAlloys/${params}`)
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
  dispatch({ type: LOADING_DATA });
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
export const getElements = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
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

export const getAlloy = (alloyId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/showDetails/${alloyId}`)
    .then((res) => {
      dispatch({
        type: SET_ALLOY,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user`)
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
