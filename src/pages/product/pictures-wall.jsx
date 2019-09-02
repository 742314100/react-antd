import React from 'react'
import PropTypes from 'prop-types'
import {Upload,Icon,Modal,message} from 'antd'

import {BASE_IMG_PATH,UPLOAD_IMG_NAME} from "../../utils/constants"
import {reqDeleteImg} from "../../api"

export default class PicturesWall extends React.Component{
    static propTypes={
        imgs:PropTypes.array
    }

    constructor(props){
        super(props)
        let fileList=[]
        const imgs=this.props.imgs
        if(imgs && imgs.length >0){
            fileList=imgs.map((img,index)=>({
                uid:-index,
                name:img,
                status:'done',
                url:BASE_IMG_PATH+img,
            }))
        }
        this.state={
            previewVisible:false,
            previewImage:'',
            fileList:fileList
        }
    }

    getImgs=()=>this.state.fileList.map(file=>file.name)

    handleCancel=()=>this.setState({previewVisible:false})

    handlePreview=(file)=>{
        this.setState({
            previewImage:file.url || file.thumbUrl,
            previewVisible:true
        })
    }

    handleChange=async ({file,fileList})=>{
        if(file.status==='done'){
            const result=file.response
            if(result.status===0){
                message.success('上传成功')
                const {name,url}=result.data
                file=fileList[fileList.length-1]
                file.name=name
                file.url=url
            }else{
                message.error('上传失败')
            }

        }else if(file.status==='removed'){
            const result=await reqDeleteImg(file.name)
            if(result.status===0){
                message.success('删除图片成功')
            }else{
                message.error('删除图片失败')
            }
        }
        this.setState({
            fileList
        })
    }



    render() {

        const {previewVisible,previewImage,fileList}=this.state

        const uploadButton=(
            <div>
                <Icon type='plus'/>
                <div>上传图片</div>
            </div>
        )

        return(
            <div>
                <Upload
                    action='/manage/img/upload'
                    accept='images/*'
                    name={UPLOAD_IMG_NAME}
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>

                <Modal>
                    <img src={previewImage} style={{width:'100%'}}/>
                </Modal>
            </div>
        )
    }


}

















