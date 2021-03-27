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

export const signin = (user) =>{
    return {type : "LOGIN_SUCCESS",payload : {user}}
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
                // if(res.status!==201)
                // return Promise.reject("Bad credentials");
                return res.json();
            })
            .then(user => {
                
    
                console.log("user = "+user);


                
                
                    console.log("no error")
                    localStorage.setItem('user',JSON.stringify(user))

                dispatch(signin(user));
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
              });

    }

}

 const signup = () =>{
    return {type : "SIGNUP_SUCCESS",payload : {message : 'User registered successfully'}}
}

export const signUp = (user) => {

    console.log("signing up")

    

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
    return {type : "LOGOUT_SUCCESS",payload : {}}
}

export const logout = () => {

    console.log("logging out.... ")

    
        localStorage.removeItem('user')

        return dispatch => {
            
    
                    dispatch(signout());
                
            

    }
}


