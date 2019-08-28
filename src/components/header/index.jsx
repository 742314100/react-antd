import React,{Component} from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import LinkButton from "../link-button"
import menuList from "../../config/menuConfig"
import {reqWeather} from "../../api"
import {formateDate} from "../../utils/dateUtil"
import memoryUtils from "../../utils/memoryUtils"
import storageUtil from "../../utils/storageUtil"

import './index.less'

class Header extends Component {

    state={
        sysTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }

    getWeather=async()=>{
        const {dayPictureUrl,weather} =await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    getSysTime=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                sysTime:formateDate(Date.now())
            })
        },1000)
    }

    Logout=()=>{
        Modal.confirm({
            content:'确认退出吗？',
            onOk:()=>{
                storageUtil.removeUser()
                memoryUtils.user={}
                this.props.history.replace('/login')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }

    getTitle=(path)=>{
        let title
        menuList.forEach(menu=>{
            if(menu.key===path){
                title=menu.title
            }else if(menu.children){
                menu.children.forEach(item=>{
                    if(path.indexOf(item.key)===0){
                        title=item.title
                    }
                })
            }
        })
        return title
    }

    componentDidMount() {
        this.getSysTime()
        this.getWeather()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render (){
        const {sysTime,dayPictureUrl,weather}=this.state
        const user=memoryUtils.user
        const path=this.props.location.pathname
        const title=this.getTitle(path)

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{sysTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)

