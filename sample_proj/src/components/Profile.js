import React, { Component } from 'react'
import DataGrid from './DataGrid'
import EditBtn from './EditBtn'

export default class Profile extends Component {

    

    render() {

        return (
            <div className='profile'>
                
                <DataGrid></DataGrid>
                <EditBtn></EditBtn>
            </div>
        )
    }
}
