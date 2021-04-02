//localStorage.removeItem('user')
// let loginUser = JSON.parse(localStorage.getItem("user"));
// const initialState = loginUser
//   ? { loggedIn: true, loginUser, user: null,employees:null }
//   : { user: null ,employees : null};

const initialState = {}

const claimReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
    case "FIND_CLAIMS_BY_EMPLOYEE":
      
      return { claims: payload.claims};

   

    default:
      return state;
  }
};

export default claimReducer;
