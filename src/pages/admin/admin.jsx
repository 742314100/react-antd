import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import memoryUtils from "../../utils/memoryUtils"
import Header from '../../components/header'
import LeftNav from "../../components/left-nav"

const {Footer,Sider,Content} =Layout

/*后台管理的路由组件*/

export default class Admin extends Component {
    render(){
        const user=memoryUtils.user
        if(!user._id){
            return <Redirect to='/login'/>
        }

        return (
           <Layout style={{height:'100%'}}>
               <Sider>
                   <LeftNav />
               </Sider>
               <Layout>
                   <Header>Header</Header>
                   <Content style={{backgroundColor:'white'}}>Content</Content>
                   <Footer style={{textAlign:'center',color:'#aaa'}}>推荐使用谷歌浏览器</Footer>
               </Layout>
           </Layout>
        )
    }
}