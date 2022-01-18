import { combineReducers } from 'redux';

import auth from './auth';
import blogs from './blog';
import open from './open';


export const reducers = combineReducers({ auth,blogs,open });