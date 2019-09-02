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

    loadData=async (selectedOptions)=>{
        const targetOption=selectedOptions[selectedOptions.length-1]
        targetOption.loading=true
        const subCategorys=await this.getCategorys(tragetOption.value)
        targetOption.loading=false
        if(subCategorys && subCategorys.length >0){
            const cOptions=subCategorys.map(c=>({
                value:c._id,
                label:c.name,
                isLeaf:true
            }))
            targetOption.children=cOptions
        }else{
            targetOption.isLeaf=true
        }

        this.setState({
            options:[...this.state.options]
        })

    }

    getCategorys=async (parentId)=>{
        const result =await reqCategorys(parentId)
        if(result.status==0){
            const categorys=result.data
            if(parentId===0){
                this.initOptions(categorys)
            }else{
                return categorys
            }
        }
    }

    initOptions =async (categorys)=>{
        const options=categorys.map(c=>({
            value:c._id,
            label:c.name,
            isLeaf:false
        }))

        const {product,isUpdate} =this
        if(isUpdate && product.pCategoryId=='0'){
            const subCategorys=await this.getCategorys(product.pCategoryId)
            if(subCategorys && subCategorys.length>0){
                const cOPtions=subCategorys.map(c=>({
                    value:c._id,
                    label:c.name,
                    isLeaf:true
                }))

                const targetOption=options.find(option=>option.value===product.pCategoryId)
                targetOption.children=cOPtions
            }
        }
        this.setState({
            options
        })
    }

    validatePrice=(rule,value,callback)=>{
        value=value*1
        if(value>0){
            callback()
        }else{
            callback('价格必须是大于0的数值')
        }
    }

    submit=()=>{
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                const {name,desc,price,categoryIds} =values
                const imgs=this.pw.current.getImgs()
                const detail=this.editor.current.getDetail()

                let pCategoryId=''
                let categoryId=''
                if(categoryIds.length===1){
                    pCategoryId='0'
                    categoryId=categoryIds[0]
                }else {
                    pCategoryId=categoryIds[0]
                    categoryId=categoryIds[1]
                }

                const product={name,desc,price,pCategoryId,categoryId,detail,img}
                if(this.isUpdate){
                    product._id=this.product._id
                }

                const result =await reqAddOrUpdateProduct(product)
                if(result.status===0){
                    message.success('保存商品成功')
                    this.props.history.goBack()
                }else{
                    message.success('保存商品失败')
                }
            }
        })
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
                categoryIds.push(categoryId)
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









