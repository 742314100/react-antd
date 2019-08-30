import React,{Component} from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'

import LinkButton from "../../components/link-button"
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import {reqCategorys,reqAddOrUpdateProduct} from "../../api"

const {Item} = Form
const {TextArea} = Input

class ProductAddUpdate extends Component {
    state={
        options:[]
    }

    constructor(props){
        super(props);
        this.pw=React.createRef();
        this.editor=React.createRef();
    }

    componentDidMount() {
       this.getCategorys('0')
    }

    componentWillMount() {
        const product=this.props.location.state
        this.product=product || {}
        this.isUpdate=!!product
    }

    render (){
        const {product,isUpdate}=this
        const {pCategoryId,categoryId} =product
        const {options} =this.state
        const {getFieldDecorator} =this.props.form

        const categoryIds=[]

        if(isUpdate){
            if(pCategoryId==='0'){
                pCategoryIds.push(categoryId)
            }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize:20}}/>
                </LinkButton>
                {isUpdate ? '修改商品':'添加商品'}
            </span>
        )

        const formItemLayout={
            labelCol:{span:2},
            wrapperCol:{span:8}
        }


        return (
            <Card title={title}>
                <Form>
                    <Item label='商品名称' {...formItemLayout}>
                        {
                            getFieldDecorator('name',{
                                initialValue:product.name,
                                rules:[
                                    {required:true,message:'商品名称必须输入'}
                                ]
                            })(
                                <Input placeholder='请输入商品名称'/>
                            )
                        }
                    </Item>
                    <Item label='商品描述' {...formItemLayout}>
                        {
                            getFieldDecorator('desc',{
                                initialValue:product.desc,
                                rules:[
                                    {required:true,message:'商品描述必须输入'}
                                ]
                            })(
                                <TextArea placeholder='请输入商品名称' autosize/>
                            )
                        }
                    </Item>
                    <Item label='商品价格' {...formItemLayout}>
                        {
                            getFieldDecorator('price',{
                                initialValue:product.price,
                                rules:[
                                    {required:true,message:'商品价格必须输入'},
                                    {validator:this.validatePrice}
                                ]
                            })(
                                <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                            )
                        }
                    </Item>
                    <Item label='商品分类' {...formItemLayout}>
                        {
                            getFieldDecorator('categoryIds',{
                                initialValue:categoryIds,
                                rules:[
                                    {required:true,message:'商品分类必须输入'}

                                ]
                            })(
                                <Cascader
                                    options={options}
                                    loadData={this.loadData}
                                />
                            )
                        }
                    </Item>
                    <Item label='商品图片' {...formItemLayout}>
                        <PicturesWall ref={this.pw} imgs={product.imgs}/>
                    </Item>
                    <Item
                        label='商品详情'
                        balelCol={{span:2}}
                        wrapperCol={{span:20}}
                    >
                        <RichTextEditor ref={this.editor} detial={product.detail}/>
                    </Item>
                    <Button type='primary' onClick={this.submit}>提交</Button>
                </Form>
            </Card>
        )
    }

}

export default Form.create()(ProductAddUpdate)









