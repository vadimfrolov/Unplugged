import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  SET_USER_SUCCESS: 'SET_USER_SUCCESS',
  FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',
  FETCH_LOGOUT: 'FETCH_LOGOUT',
};


export const setUserAC = (user) => {
  return{  
    type: TYPES.SET_USER_SUCCESS,
    payload: user
  }
};

export const logoutAC = () => async dispatch => {

  dispatch({ type: TYPES.FETCH_USER_REQUEST });
  
  try {
    await axios.get('/users/logout/');
    dispatch(setUserAC( null ));  
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const registrationAC = (data) => async dispatch => {

  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    console.log('aslkdkhqpjw;jkdmq',data);    
    const response = await axios.put('/users/registration/', { user: data });
    const user = await get(response, "data")
    dispatch(setUserAC( user ));  
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
}

export const loginAC = (data) => async dispatch => {

  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try{   
  const response = await axios.post('/users/login/', { user: data });
  const user = await get(response, "data")
  console.log('sadzzzzzzzzzzzzzzzzasda',user); 
  dispatch(setUserAC( user ))
  } catch(err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
}

// export const FBloginAC = () => async dispatch => {

//   dispatch({ type: TYPES.FETCH_USER_REQUEST });

//   try{   
//   const response = await axios.get('/users/login/facebook/');
//   const user = await get(response, "data")
//   console.log('sadzzzzzzzzzzzzzzzzasda',user); 
//   dispatch(setUserAC( user ))
//   } catch(err) {
//     dispatch({ type: TYPES.FETCH_USER_FAILURE });
//     console.log(err);
//   }
// }

