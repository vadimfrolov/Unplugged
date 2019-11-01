import { FETCH_PAST_DATES, FETCH_DATE } from "./types";

const initialState = {
  years: [],
  events:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAST_DATES: {
      return {
        ...state,
        years: [...new Set([...state.years, ...action.years])]
      };
    }
    case FETCH_DATE: {

      return {
        ...state,
        events:action.events
        
      };
    }
    default:
      return state;
  }
}
