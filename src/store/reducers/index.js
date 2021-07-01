import { combineReducers } from 'redux';
import postReducer from './postReducer.js';
import searchReducer from './searchReducer.js';

export default combineReducers({
  postReducer,
  searchReducer
});
