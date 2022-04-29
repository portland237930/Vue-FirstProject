module.exports = {
    //关闭eslint
    // lintOnSave: false,
    // 打包时去除map文件
    productionSourceMap: false,
    devServer: {
        // development server port 8000
        port: 8001,
        // devServer: {
        //     overlay: {
        //         warnings: false, //不显示警告
        //         errors: false //不显示错误
        //     }
        // },
        //代理服务器解决跨域
        proxy: {
            //会把请求路径中的/api换为后面的代理服务器
            '/api': {
                //提供数据的服务器地址
                target: 'http://39.98.123.211',

            }
        },
    }
}