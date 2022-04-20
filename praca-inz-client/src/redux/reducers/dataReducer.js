import {
  SET_ALLOYS,
  LOADING_DATA,
  LOADING_ELEMS,
  LOADING_PROPS,
  SET_ALLOY,
  SET_PROPS,
  SET_DATA,
  SET_GROUPS,
  LOADING_GROUPS,
  SET_ELEMS
} from '../types';

const initialState = {
  alloys: [],
  alloy: [],
  groups: [],
  loading: false,
  loadingElements: false,
  loadingProps: false,
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
    case LOADING_ELEMS:
      return {
        ...state,
        loadingElements: true
      };
    case LOADING_PROPS:
      return {
        ...state,
        loadingProps: true
      };
      case LOADING_GROUPS:
      return {
        ...state,
        loadingProps: true
      };
    case SET_ALLOYS:
      return {
        ...state,
        alloys: action.payload,
        loading: false
      };
      case SET_GROUPS:
        return {
          ...state,
          groups: action.payload,
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
        loadingProps: false
      };
    case SET_ELEMS:
      return {
        ...state,
        elements: action.payload,
        loadingElements: false
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
