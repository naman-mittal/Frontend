import React from 'react'
import DataGrid from './DataGrid'
import EditBtn from './ActionBtn'
import {Link,useRouteMatch} from 'react-router-dom'


export default function Profile({match}){

    let { path, url } = useRouteMatch();

    

        return (
            <div className='profile'>
                {console.log("param id = " + match.params.id)}
                
                <DataGrid viewId={match.params.id}></DataGrid>
               
            </div>
        )
    
}
