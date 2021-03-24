const findUser = (user) =>{
    return {type : "FIND_USER",payload : {user}}
}

export const fetchUser = (id) => {

    console.log("inside fetch user... id = " + id)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
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
            })

    }

}
