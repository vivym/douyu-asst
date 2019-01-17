const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = (config, target = { chrome: 52, firefox: 48 }) => {
  const bubleOptions = {
    target,
    objectAssign: 'Object.assign',
    transforms: {
      forOf: false,
      modules: false,
    },
  };

  const baseConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
      alias: {
        src: path.resolve(__dirname, '../src'),
        shellChrome: path.resolve(__dirname, './chrome'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'buble-loader',
          exclude: /node_modules|vue\/dist|vuex\/dist/,
          options: bubleOptions,
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: '.cache/vue-loader',
                cacheIdentifier: '0baf4376',
              },
            },
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false,
                },
                transpileOptions: bubleOptions,
                cacheDirectory: '.cache/vue-loader',
                cacheIdentifier: '0baf4376',
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(svg)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'media/[name].[hash:8].[ext]',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 0,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:8].[ext]',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              resourceQuery: /\?vue/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              test: /\.module\.\w+$/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              resourceQuery: /\?vue/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              test: /\.module\.\w+$/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.p(ost)?css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              resourceQuery: /\?vue/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              test: /\.module\.\w+$/,
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'vue-style-loader',
                  options: {
                    sourceMap: false,
                    shadowMode: false,
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new VueLoaderPlugin(),
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      /*
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/,
        ],
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: 'asyncChunks'
      }),
      */
      // new BundleAnalyzerPlugin(),
    ],
    devServer: {
      port: process.env.PORT,
    },
    stats: {
      colors: true,
    },
  };

  if (process.env.NODE_ENV === 'production') {
    const TerserPlugin = require('terser-webpack-plugin');
    baseConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    );

    baseConfig.optimization = {
      minimizer: [
        new TerserPlugin({
          // exclude: /backend/,
          terserOptions: {
            compress: {
              // turn off flags with small gains to speed up minification
              arrows: false,
              collapse_vars: false, // 0.3kb
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,

              // a few flags with noticable gains/speed ratio
              // numbers based on out of the box vendor bundle
              booleans: true, // 0.7kb
              if_return: true, // 0.4kb
              sequences: true, // 0.7kb
              unused: true, // 2.3kb

              // required features to drop conditional branches
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
          },
          sourceMap: false,
          cache: true,
          parallel: true,
        }),
      ],
    };
  }

  return merge(baseConfig, config);
};
