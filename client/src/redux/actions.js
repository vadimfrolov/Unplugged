import { SET_USER } from './types';

const setUserAC = (user) => {
  return {
    type: SET_USER,
    currentUser: user
  }
};

export { setUserAC };