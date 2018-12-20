var path = require('path')
var DevelopmentProjectName = 'project'
module.exports = {
    // 开发项目路径
    modulePath:path.resolve(__dirname,'../'+DevelopmentProjectName),
    DevelopmentProjectName,
    dev:{
        assetsPublicPath:'../'
    },
    build:{
        assetsPublicPath:"https://pic.bianla.cn/bianlaAPI/"
    }

}