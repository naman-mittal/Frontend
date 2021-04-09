import {portNumber} from '../helpers/port'
const user = JSON.parse(localStorage.getItem('user'));

export const findProjects = (projects) => {
    return { type: "FIND_PROJECTS", payload : {projects} }
  }
  
  export const fetchProjects = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' ,'Authorization': 'Bearer ' + user.accessToken}
    };
  
    return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/projects/`, requestOptions)
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          console.log(data);
          dispatch(findProjects(data));
        })
    }
  }