var glob = require('glob')
var pathConfig = require('./path.config')
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
exports.entryConfig =function(){
    var obj = {};
    glob.sync(`${pathConfig.modulePath}/*/*.js`).forEach((name)=>{
        
        // 入口文件名称
        var basename = path.basename(name, path.extname(name));
        //路径切割
        var pathSplit = name.split('/').splice(-4);
        var projectName = '';
        pathSplit.forEach((val,index)=>{
            if(val == pathConfig.DevelopmentProjectName){
                projectName = pathSplit[index+1]
            }
        })
        var pathName = `${projectName}/${basename}`;
        obj[pathName] = name;
    })
    return obj
};
