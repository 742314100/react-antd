import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from "../../utils/memoryUtils"

/*后台管理的路由组件*/

export default class Admin extends Component {
    render(){
        const user=memoryUtils.user
        if(!user._id){
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <h2>后台管理</h2>
                <div>Hello {user.username}</div>
            </div>
        )
    }
}