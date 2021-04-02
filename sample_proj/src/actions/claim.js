const findClaimsByEmployee = (claims) =>{
    return {type : "FIND_CLAIMS_BY_EMPLOYEE",payload : {claims}}
}

export const fetchClaimsByEmployee = (id) => {

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
        fetch('http://localhost:8080/api/v1/expenseClaims/employee/'+id, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findClaimsByEmployee(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}