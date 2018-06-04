const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('./package.json');

module.exports = {
    entry: {
        main: './src/main.js',
        // vendor: ['vue', 'vue-router', 'vuex', 'axios']
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,

                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            postcss: [require('postcss-cssnext')()],
                            loaders: {
                                css: ExtractTextPlugin.extract({
                                    use: 'css-loader!px2rem-loader?remUnit=75&remPrecision=8',
                                    fallback: 'vue-style-loader'
                                }),
                                scss: ExtractTextPlugin.extract({
                                    use: 'css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                                    fallback: 'vue-style-loader'
                                }),
                                less: ExtractTextPlugin.extract({
                                    use: 'css-loader!px2rem-loader?remUnit=75&remPrecision=8!less-loader',
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    }
                ],
            },
            {
                test: '/\.scss$/',
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
                        loader: 'scss-loader',
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
                ]
            },
            {
                test: '/\.less$/',
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
                ]
            },
            {
                test: '/\.json$/',
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:5].[ext]'
                },
                // include: config.srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:5].[ext]',
                    limit: 10000,
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.scss', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: false,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html',
            title: 'vue generator starter kit',
            chunks: ['main', 'vendor', 'manifest'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            filename: 'js/[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
