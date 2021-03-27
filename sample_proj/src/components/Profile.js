import React from 'react'
import DataGrid from './DataGrid'
import EditBtn from './EditBtn'
import {Link,useRouteMatch} from 'react-router-dom'


export default function Profile(){

    let { path, url } = useRouteMatch();

    

        return (
            <div className='profile'>
                
                <DataGrid></DataGrid>
                <Link to={`${url}/edit`}>
                <EditBtn></EditBtn>
                </Link>
            </div>
        )
    
}
