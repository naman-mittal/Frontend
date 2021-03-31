import {projectManagers} from '../helpers/sampleData'


const findUser = (user) =>{
    return {type : "FIND_USER",payload : {user}}
}

export const fetchUser = (id) => {

    console.log("inside fetch user... id = " + id)
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch('http://localhost:8080/api/v1/employee/'+id, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findUser(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}

const updateUser = () =>{
    return {type : "UPDATE_USER",payload : {message : 'Updated Successfully'}}
}

export const editUser = (updateRequest) => {

    //console.log("inside fetch user... id = ")
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    },
    body : JSON.stringify(updateRequest)
    };
    return dispatch => {
        fetch('http://localhost:8080/api/v1/employee', requestOptions)
            .then(res => {
                console.log(res);
                dispatch(updateUser());
            })
            .catch((error) => {
                console.error('Error:', error);
              });

    }

}

const removeUser = (id) =>{
    return {type : "DELETE_EMPLOYEE_SUCCESS",payload : {id,alert:{type : 'success',message : 'Employee deleted!'}}}
}

export const deleteUser = (id) => {

    console.log("inside delete user... id = " + id)
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch('http://localhost:8080/api/v1/employee/'+id, requestOptions)
            .then(res => {
                console.log(res);
                if(res.status!==204)
                return Promise.reject("Couldn't delete!");
                dispatch(removeUser(id));
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({type : "DELETE_EMPLOYEE_FAILED",payload : {alert:{type : 'error',message : error}}})
              });

    }

}

const findEmployees = (employees) =>{
    return {type : "FIND_Employees",payload : {employees}}
}

export const fetchEmployees = () => {

    //console.log("fetch user... id = " + id)
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch('http://localhost:8080/api/v1/employees', requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findEmployees(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}


export const signin = (user) =>{
    return {type:'LOGIN_SUCCESS',payload : {user,alert : {type : 'success',message : 'Successfully logged in'}}}
}

export const login = (username,password) => {

    console.log("logging in with " + username + password)

    const loginRequest = {
        username : username,
        password : password
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(loginRequest)
    };
    return dispatch => {

       

        fetch('http://localhost:8080/api/v1/signin', requestOptions)
            .then(res => {
                console.log(res);
                //console.log(res.message);
                 if(res.status!==200)
                 return Promise.reject("Incorrect username and password");
                return res.json();
            })
            .then(user => {
                
    
                console.log("user = "+user);


                
                
                    console.log("no error")
                    localStorage.setItem('user',JSON.stringify(user))
                    //history.push('/')
                dispatch(signin(user));

                
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({type:'LOGIN_FAILED',payload : {alert : {type : 'error',message : error}}})
              });

    }

}

 const signup = () =>{
    return {type : "SIGNUP_SUCCESS",payload : {message : 'User registered successfully'}}
}

export const signUp = (user) => {

    console.log("signing up")

    if(projectManagers.includes(user.email))
    {
        user['roles'] = ['manager']
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(user)
    };
    return dispatch => {

       

        fetch('http://localhost:8080/api/v1/signup', requestOptions)
            .then(res => {
                console.log(res);
                //console.log(res.message);
                // if(res.status!==201)
                // return Promise.reject("Bad credentials");
                return res.json();
            })
            .then(res => {
                
    
                console.log(res);


                
                
                    //console.log("no error")
                    //localStorage.setItem('user',JSON.stringify(user))

                dispatch(signup());
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
              });

    }

}

const signout = () =>{
    return {type : "LOGOUT_SUCCESS",payload : {alert : {type : 'success',message : 'Successfully logged out'}}}
}

export const logout = () => {

    console.log("logging out.... ")

    
        localStorage.removeItem('user')

        return dispatch => {
            
    
                    dispatch(signout());
                
            

    }
}

export const reset = () =>{
    return {type : "RESET",payload : {}}
}
