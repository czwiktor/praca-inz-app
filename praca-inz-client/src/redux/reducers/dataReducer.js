import {
  SET_ALLOYS,
  LOADING_DATA,
  SET_ALLOY,
  SET_PROPS,
  SET_DATA,
  SET_ELEMS
} from '../types';

const initialState = {
  alloys: [],
  alloy: {},
  loading: false,
  elems: [],
  props: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ALLOYS:
      return {
        ...state,
        alloys: action.payload,
        loading: false
      };
    case SET_ALLOY:
      return {
        ...state,
        alloy: action.payload
      };
    case SET_PROPS:
      return {
        ...state,
        props: action.payload
      };
    case SET_ELEMS:
      return {
        ...state,
        elems: action.payload
      };
    case SET_DATA:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
