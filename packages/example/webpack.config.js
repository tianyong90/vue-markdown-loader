const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    symlinks: false
  },
  module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},
				test: /\.js$/
			},
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhiteSpace: false
              }
            }
          },
          {
            // 使用 @tianyong90/vue-markdown-loader
            loader: '@tianyong90/vue-markdown-loader',
            options: {
              // sourceDir: ''
              contentCssClass: 'markdown-body',
              markdown: {
                lineNumbers: true,
              }
            }
          }
        ]
      }
    ]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      title: '@tianyong90/vue-markdown-loader example',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};
