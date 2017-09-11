const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script/main.js',
        login: './src/script/login.js'
    },

    output: {

        path: path.resolve('./dist'),

        filename: 'js/[name].js'

    },
    plugins: [
        // 自己下载的加入插件
        new htmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html',//指定模版
            minify: {
                removeComments: true, // 压缩注释
                collapseWhitespace: true // 压缩空格
            },
            excludeChunks: ['login']
        }),
        new htmlWebpackPlugin({
            filename: "login.html",
            template: 'login.html',//指定模版
            minify: {
                removeComments: true, // 压缩注释
                collapseWhitespace: true // 压缩空格
            },
            excludeChunks: []
        })
    ],
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)

            {
                test: /\.jsx?$/, // 匹配的文件
                loader: 'babel-loader',   // 在.babelrc 配置相关的参数
                exclude: path.resolve(__dirname, 'node_modules'), //  排除的目录 填写绝对路径
                include: path.resolve(__dirname, 'src') // 需求运行的目录
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use:[{loader:'file-loader', options: {
                    name: 'img/[name]-[hash:5].[ext]' // 设置文件的打包路径以及后缀名
                }},{loader: 'image-webpack-loader'}], // 图片文件压缩loader
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader',}, {loader: 'css-loader',}, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [require('autoprefixer')({browsers: ["last 5 versions"]})];
                        }
                    }
                }],
            },
            {
                test: /\.scss/,
                use: [{loader: 'style-loader',}, {loader: 'css-loader',}, {loader: 'sass-loader',},{
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [require('autoprefixer')({browsers: ["last 5 versions"]})];
                        }
                    }
                }],

            },
            ],
    }

}
