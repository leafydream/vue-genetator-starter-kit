const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('./package.json');
const config = require('./config');

module.exports = {
    entry: {
        main: './src/main',
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        publicPath: config.publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
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
                                css: ExtractTextPlugin.extract({
                                    use: 'css-loader?minimize!px2rem-loader?remUnit=75&remPrecision=8',
                                    fallback: 'vue-style-loader'
                                }),
                                scss: ExtractTextPlugin.extract({
                                    use: 'css-loader?minimize!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                                    fallback: 'vue-style-loader'
                                }),
                                less: ExtractTextPlugin.extract({
                                    use: 'css-loader?minimize!px2rem-loader?remUnit=75&remPrecision=8!less-loader',
                                    fallback: 'vue-style-loader'
                                })
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]',
                            limit: 10000,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                            progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],      
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:8].[ext]',
                    limit: 10000,
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
    resolve: {
        extensions: ['.js', '.vue', '.less', '.scss', '.css', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        },
        mainFields: ['main']
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.NamedChunksPlugin(),
        new ParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].min.[chunkhash:8].css',
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
            names: ['vendor', 'manifest'],
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
