const {override,fixBabelImports,addLessLoader} =require('customize-cra');

module.exports=override(
    //按需加载antd 样式,并且修改antd 默认样式
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true,
    }),
    addLessLoader({//使用less-loader 对源码中less 的变量进行重新指定
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1DA57A'}
    })
);