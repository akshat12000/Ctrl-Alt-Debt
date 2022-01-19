import { combineReducers } from 'redux';

import auth from './auth';
import blogs from './blog'


export const reducers = combineReducers({ auth,blogs });