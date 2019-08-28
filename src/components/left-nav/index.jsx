import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import menuConfig from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

const SubMenu = Menu.SubMenu

class LeftNav extends Component {

    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname

        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.item>
                ))
            }else{
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
                if(item.children.find(cItem=>path.indexOf(cItem.key)===0)){
                    this.openKey=item.key
                }
            }
            return pre
        },[])
    }

    getMenuNodes2=(menuList)=>{
        const path=this.props.location.pathname

        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                if(item.children.find(cItem=>path.indexOf(cItem.key)===0)){
                    this.openKey=item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount() {
        this.menuNodes=this.getMenuNodes2(menuConfig)
    }

    render(){
        const selectKey=this.props.location.pathname
        const openKey=this.openKey

        return (
            <div className="left-nav">
                <Link to='/home' className='logo-link'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode='inline'
                    theme='dark'
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }

}

export default withRouter(LeftNav)













