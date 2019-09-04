import ajax from './ajax'
import jsonp from 'jsonp'

export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')

export function reqWeather(city) {
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
9MVra6urFRGOT9s8UBWr2`
    return new  Promise((resolve,reject)=>{
        jsonp(url,{
            param:'callback'
        },(error,response)=>{
            if(!error && response.status == 'success'){
                const {dayPictureUrl,weather} =response.response[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                alert('获取天气信息失败')
            }
        })
    })
}

export const reqCategorys=(parentId)=>{
    ajax('/manage/category/list',{parentId})
}

export const reqAddCategory=(parentId,categoryName)=>ajax('/manage/category/add',{
    parentId,
    categoryName
},'POST')

export const reqUpdateCategory=({categoryId,categoryName})=>{
    ajax('/manage/category/update',{
        categoryId,
        categoryName
    },'POST')
}

export const reqCategory=(categoryId)=>ajax('/manage/category/info',{categoryId})

export const reqProducts=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})

export const reqSearchProducts=({pageNum,pageSize,searchType,searchName})=>{
    ajax('/manage/product/search',{
        pageNum,
        pageSize,
        [searchType]:searchName
    })
}

export const reqAddOrUpdateProduct=(product)=>ajax('/manage/product/'+(product._id ? 'update':'add'),product,'post')

export const reqUpdateProductStatus=(productId,status)=>{
    ajax('/manage/product/updateStatus',{
        productId,
        status
    },'POST')
}

export const reqDeleteImg =(name) =>ajax('/manage/img/delete',{name},'post')

export const reqAddRole=(roleName)=>ajax('/manage/role/add',{roleName},'POST')

export const reqRole=()=>ajax('/manage/role/list')

export const reqUpdateRole=(role)=>ajax('/manage/role/update',role,'POST')

export const reqAddOrUpdateUser=(user)=>ajax('/manage/user/'+(user._id?'update':'add'),user,'POST')

export const reqUsers=()=>ajax('/manage/user/list')

export const reqDeleteUser=(userId)=>ajax('/manage/user/delete',{userId},'POST')

