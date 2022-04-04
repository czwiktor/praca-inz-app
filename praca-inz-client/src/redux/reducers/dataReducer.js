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
  alloy: [],
  loading: false,
  elements: [],
  propses: []
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
        alloy: action.payload,
        loading: false
      };
    case SET_PROPS:
      return {
        ...state,
        propses: action.payload,
        loading: false
      };
    case SET_ELEMS:
      return {
        ...state,
        elements: action.payload,
        loading: false
      };
    case SET_DATA:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
