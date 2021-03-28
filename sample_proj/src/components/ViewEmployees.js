import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../actions/user'


export default function ViewEmployees() {

    const employees = useSelector(state => state.employees)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(actions.fetchEmployees())
        console.log(employees)

    },[]);


    if(employees===undefined)
    {
        return(
            <h1>
            Loading...
            </h1>
        )
    }

    return (
        <div>
            <h1>Employees {employees.length}</h1>
        </div>
    )
}
