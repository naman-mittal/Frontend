import {portNumber} from '../helpers/port'


export const findExpenses = (expenses) => {
    return { type: "FIND_EXPENSES", payload : {expenses}}
  }
  
  export const fetchExpenses = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user.accessToken }
    };
  
    return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/expenses/`, requestOptions)
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          console.log(data);
          dispatch(findExpenses(data));
        })
    }
  }