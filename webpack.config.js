const path = require('path')
var glob = require('glob')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var Autoprefixer = require('autoprefixer')
const globConfig = require('./build/globConfig')
var pathConfig = require('./build/path.config')
const entry = globConfig.entryConfig();
const ip = require('./build/getIp')
const  NODE_ENV = process.argv[2].replace('--env=','');
module.exports = devWebpackConfig = {
    entry,
    output:{
        filename:"[name].[hash:5].js",
        path:path.resolve(__dirname,'dist'),
        publicPath:NODE_ENV=='production'?
                   pathConfig.build.assetsPublicPath:
                   NODE_ENV=='development'?
                   pathConfig.dev.assetsPublicPath:'/'
                  
    },
    plugins:[
        Autoprefixer,
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {     //压缩代码
                dead_code: true,    //移除没被引用的代码
                warnings: false,     //当删除没有用处的代码时，显示警告
                loops: true //当do、while 、 for循环的判断条件可以确定是，对其进行优化
            },
            except: ['$super', '$', 'exports', 'require']    //混淆,并排除关键字
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new ExtractTextPlugin("[name].[hash:5].css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["env"]
                    }
                },
                exclude:path.resolve(__dirname,"node_modules"),
            },{
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:['css-loader','postcss-loader']
                })
            },{
                test:/\.(jpg|png|git)$/,
                use:{
                    loader:'file-loader'
                }
            },
            {
                test:/\.vue$/,
                use:{
                    loader:'vue-loader'
                }
            },{
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:['css-loader',"postcss-loader",'less-loader']
                })
            }
        ]
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase:"./dist",
        host:ip()
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    }
}



// 多入口html配置插件
var pages = glob.sync(`${pathConfig.modulePath}/*/*.html`);
    // js 入口
var chunks = Object.keys(entry);
for (var pathname=0;pathname<pages.length;pathname++) {
    var chunkname = null;
    for(let i =0;i<chunks.length;i++){
        if(pages[pathname].indexOf(chunks[i]+'.html')!='-1'){
            chunkname = chunks[i];
        }
    };
    var conf = {
        filename: pages[pathname].replace("project/","dist/"),
        template: pages[pathname], // 模板路径
        chunks: [chunkname, 'vendor','manifest'], // 每个html引用的js模块
        inject: true              // js插入位置
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}