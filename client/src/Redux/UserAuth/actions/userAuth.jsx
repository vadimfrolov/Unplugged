export const TYPES = {
  SET_USER: 'SET_USER',
}


export const setUserAC = (user) => async dispatch => {
  dispatch({
    type: TYPES.SET_USER,
    payload: user
  })
}

