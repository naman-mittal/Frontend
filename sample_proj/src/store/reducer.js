//localStorage.removeItem('user')
let loginUser = JSON.parse(localStorage.getItem("user"));
const initialState = loginUser
  ? { loggedIn: true, loginUser, user: {} }
  : { user: {} };

const reducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case "FIND_Employees":
      return { employees: payload.employees, message: "" };

    case "LOGIN_SUCCESS":
      return {
        loggedIn: true,
        loginUser: payload.user,
      };

    case "LOGOUT_SUCCESS":
      return {};

    case "SIGNUP_SUCCESS":
      return {
        message: payload.message,
      };

    case "FIND_USER":
      return { users: state.users, user: payload.user };

    case "ADD_USER":
      return { users: state.users, message: payload.message };

    case "DELETE_USER":
      var filteredList = state.users.filter(
        (user) => user.id !== payload.user.id
      );
      return { users: filteredList, message: "" };

    case "UPDATE_USER":
      console.log(payload.message);
      return { users: state.users, message: payload.message };

    default:
      return state;
  }
};

export default reducer;
