//localStorage.removeItem('user')
let loginUser = JSON.parse(localStorage.getItem("user"));
const initialState = loginUser
  ? { loggedIn: true, loginUser, user: null,employees:null }
  : { user: null ,employees : null};

const reducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case "FIND_Employees":
      let filteredList = payload.employees.filter(
        (emp) => emp.loginDetails.roles[0].name !== 'ROLE_ADMIN'
      );
      return { employees: filteredList, message: "" };

    case "LOGIN_SUCCESS":
      return {
        loggedIn: true,
        loginUser: payload.user,
        alert : payload.alert 
      };

      case "LOGIN_FAILED":
        return {
         
         
          alert : payload.alert
        };
  

    case "LOGOUT_SUCCESS":
      return {
        alert : payload.alert
      };

    case "RESET" :
      return {}  

    case "SIGNUP_SUCCESS":
      return {
        message: payload.message,
      };

    case "DELETE_EMPLOYEE_SUCCESS":
      console.log(payload.id)
      let filtered = state.employees.filter(
        (emp) => emp.empId !== parseInt(payload.id)
      );
      return { employees: filtered, alert: payload.alert };

      case "DELETE_EMPLOYEE_FAILED":
        
        return { employees: state.employees, alert: payload.alert };

        case "FIND_USER":
          return { users: state.users, user: payload.user };
    
        case "ADD_USER":
          return { users: state.users, message: payload.message };

    case "UPDATE_USER":
      console.log(payload.message);
      return { updated : true, message: payload.message };

    default:
      return state;
  }
};

export default reducer;
