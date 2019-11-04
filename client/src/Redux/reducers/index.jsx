import { combineReducers } from 'redux';

import artistReducer from './artistReducer';
import userReducer from '../UserAuth/reducer/userAuth';

export default combineReducers({
  artist: artistReducer,
  user: userReducer
})
