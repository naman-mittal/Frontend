import React, { Component } from 'react'
import DataGrid from './DataGrid'
import UserImg from './UserImg'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <UserImg initials={'NM'}></UserImg>
                <br/>
                <DataGrid></DataGrid>
            </div>
        )
    }
}
