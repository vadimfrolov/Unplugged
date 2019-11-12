import { combineReducers } from "redux";

import artistReducer from "../artistReducer/artistReducer";
import artistConcertsReducer from "../concertsReducer/concertsReducers";
import concertPageReducer from '../concertPageReducer/concertPageReducer';
import ConcertExploreReducer from '../ConcertExploreReducer/ConcertExploreReducer';
import userReducer from '../UserAuth/reducer/userAuth';
import youtubeReducer from "../youtubeReducer/youtubeReducer";


export default combineReducers({
  artist: artistReducer,
  concerts: artistConcertsReducer,
  concertPage: concertPageReducer,
  events: ConcertExploreReducer,
  user: userReducer,
  youtube: youtubeReducer,
});
