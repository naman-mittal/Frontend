import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import * as actions from '../actions/user'

export default function EditUser() {

    const user = useSelector(state => state.user)

  //  const history = useHistory()

    const dispatch = useDispatch();  

    useEffect(() => {

        let loginUser = JSON.parse(localStorage.getItem('user'));
        if(loginUser)
          dispatch(actions.fetchUser(loginUser.id))
      
        },[]);

    return (
        <div>
            <h1>Edit page {user?user.empName:'No data'}</h1>
        </div>
    )
}
