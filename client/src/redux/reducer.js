import { SET_USER } from './types'



const initialState = {
  user: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        usuer: action.state.user,
      }
    }
    default:
      return state;
      
  }
}