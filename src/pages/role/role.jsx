import React,{PureComponent} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {PAGE_SIZE} from "../../utils/constants"
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api'
import AddForm from './add-form'
import AuthForm from "./auth-form"
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from "../../utils/dateUtil"

export default class Role extends PureComponent{
    state={
        roles:[],
        role:{},
        isShowAdd:false,
        isShowAuth:false
    }

    constructor(props){
        super(props)
        this.auth=React.createRef()
    }

    getRoles=async()=>{
        const result =await reqRoles()
        if(result.status===0){
            const roles=result.data
            this.setState({
                roles
            })
        }
    }

    initColumn=()=>{
        this.columns=[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'角色名称',
                dataIndex:'create_time',
                render:(create_time)=>formateDate(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formateDate
            },
            {
                title:'授权人',
                dataIndex:'auth_name',
            }
        ]
    }

    onRow=(role)=>{
        return {
            onClick:event=>{
                this.setState({
                    role
                })
            }
        }
    }

    addRole=()=>{
        this.form.validateFields(async (error,values)=>{
            if(!error){
                this.setState({
                    isShowAdd:false
                })

                const {roleName}=values
                this.form.resetFields()

                const result =await reqAddRole(roleName)

                if(result.status===0){
                    message.success('添加角色成功')
                    const role=result.data
                    this.setState(state=>({
                        roles:[...state.roles,role]
                    }))
                }

            }else{
                message.success('添加角色失败')
            }
        })
    }

    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render(){

        const {roles,role,isShowAdd,isShowAuth}=this.state
        const title =(
            <span>
                <Button type='primary' onClick={()=>this.setState({isShowAdd: true})}>
                    创建角色
                </Button>
                <Button type='primary' disabled={!role._id} onClick={()=>this.setState({isShowAuth: true})}>
                    设置角色权限
                </Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                    onRow={this.onRow}
                />

                <Modal
                    title='添加角色'
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={()=>{
                        this.setState({isShowAdd:false})
                        this.form.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form)=>this.form=form}
                    />
                </Modal>

                <Modal
                    title='设置角色权限'
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({isShowAuth:false})
                    }}
                >
                    <AuthForm ref={this.auth} role={role}/>
                </Modal>
            </Card>
        )
    }

}













