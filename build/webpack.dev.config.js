const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('../config');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: resolve('src/main')
    },
    output: {
        path: config.srcPath,
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            postcss: [require('postcss-cssnext')()],
                            loaders: {
                              css: 'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8',
                              scss: 'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                              less: 'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8!less-loader'
                            }
                        }
                    }
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: [
                          require('autoprefixer')({
                            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                          })
                        ]
                      }
                    }
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: [
                          require('autoprefixer')({
                            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                          })
                        ]
                      }
                    }
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: [
                          require('autoprefixer')({
                            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                          })
                        ]
                      }
                    }
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader'
                    }
                ],
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]',
                    limit: 10000
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:8].[ext]',
                    limit: 10000
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:8].[ext]'
                },
                include: config.srcPath,
                exclude: config.libPath
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: config.buildPath,
        compress: true,
        progress: true,
        hot: true,
        inline: true,
        port: config.port,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.scss', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': config.srcPath
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: resolve('src/template/index.html'),
            filename: 'index.html',
            title: 'vue generator starter kit',
        }),
        new webpack.NamedModulesPlugin()
    ]
};
