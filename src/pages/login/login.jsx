import React,{Component} from 'react'
import './login.less'
import { Form, Icon, Input, Button, message } from 'antd';
import logo from './images/bg.jpg'
import {reqLogin} from "../../api"
import memoryUtils from "../../utils/memoryUtils"
import storageUtil from "../../utils/storageUtil"
import {Redirect} from 'react-router-dom'

const Item =Form.Item

/*登录路由组件*/

class Login extends Component {

    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.form.validateFields(
            async(err,values)=>{
                if(!err){
                    const {username,password}=values
                    const result =await reqLogin(username,password)
                      if(result.status===0){
                          message.success('登录成功',2)
                          const user=result.data
                          storageUtil.saveUser(user)
                          memoryUtils.user=result.data
                          this.props.history.replace('/')
                      } else{
                          message.error(result.msg)
                      }
                }else{
                     console.log('校验失败')
                }

            }
        )
    }

    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码长度不能小于4位')
        }else if(value.length>12){
            callback('密码长度不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文数字下划线组成')
        }else{
            callback()
        }
    }




    render(){
        const form =this.props.form
        const {getFieldDecorator} =form

        if(memoryUtils.user && memoryUtils.user._id){
            return <Redirect to='/' />
        }

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        {required:true,whitespace:true,message:'必须输入用户名'},
                                        {min:4,message:'用户名必须大于4位'},
                                        {max:12,message:'用户名必须小于12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>} placeholder='用户名'/>
                                )
                            }

                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password',{
                                    rule:[
                                        {validator:this.validator}
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                    />
                                )
                            }

                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin=Form.create()(Login)
export default WrapLogin