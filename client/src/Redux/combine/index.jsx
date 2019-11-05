import { combineReducers } from "redux";

import artistReducer from "../artistReducer/artistReducer";
import artistConcertsReducer from "../concertsReducer/concertsReducers";
import concertPageReducer from "../concertPageReducer/concertPageReducer";
import userReducer from "../UserAuth/reducer/userAuth";
import youtubeReducer from "../youtubeReducer/youtubeReducer";
export default combineReducers({
  artist: artistReducer,
  concerts: artistConcertsReducer,
  concertPage: concertPageReducer,
  user: userReducer,
  youtube: youtubeReducer
});
