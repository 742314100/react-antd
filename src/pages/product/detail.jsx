import React,{Component} from 'react'
import {List,Icon,Card} from 'antd'

import {reqCategory} from "../../api"
import {BASE_IMG_PATH} from '../../utils/constants'
import LinkButton from "../../components/link-button"

export default class ProductDetail extends Component {
    state={
        cName1:'',
        cName2:''
    }

    getCategoryName=async()=>{
        const {categoryId,pCategoryId}=this.props.location.state
        if(pCategoryId==='0'){
            const result=await reqCategory(categoryId)
            const cName1=result.data.name
            this.setState({cName1})
        }else{
            const results=await Promise.all([reqCategory(pCategoryId),
                reqCategory(categoryId)])
            const result1=results[0]
            const result2=results[1]
            const cName1=result1.data.name
            const cName2=result2.data.name
            this.setState({
                cName1,
                cName2
            })
        }

    }

    componentDidMount() {
        this.getCategoryName()
    }

    render() {
        const {name,desc,price,imgs,detail}=this.props.location.state
        const {cName1,cName2}=this.state
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize:20}}/>
                </LinkButton>
                商品详情
            </span>
        )

        const imgStyle={width:150,height:150,marginRight:10,border:'1px solid black'}

        return (
            <Card className='product-detail' title={title}>
                <List>
                    <List.Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品描述</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品价格</span>
                        <span>{price+'元'}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">所属分类</span>
                        <span>{cName1+(cName2 ? '-->'+cName2:'')}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品图片</span>
                        <span>
                            {
                                imgs.map(img=>(
                                    <img src={BASE_IMG_PATH+img} alt="img" key={img} style={imgStyle}/>
                                ))
                             }
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品详情</span>
                        <div dangerouslySetInnerHTML={{__html:detail}}></div>
                    </List.Item>
                </List>
            </Card>
        )
    }

}











