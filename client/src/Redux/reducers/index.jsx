import { combineReducers } from "redux";

import artistReducer from "./artistReducer";
import artistConcertsReducer from "../concertsReducer/concertsReducers";
export default combineReducers({
  artist: artistReducer,
  conserts: artistConcertsReducer
});
