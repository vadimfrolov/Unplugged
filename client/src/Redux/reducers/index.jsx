import { combineReducers } from "redux";

import artistReducer from "./artistReducer";
import artistConcertsReducer from "../concertsReducer/concertsReducers";
import userReducer from '../UserAuth/reducer/userAuth';

export default combineReducers({
  artist: artistReducer,
  conserts: artistConcertsReducer,
  user: userReducer
});
