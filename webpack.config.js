var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.js');
var BUILD_PATH = path.resolve(__dirname, './public/js');

module.exports = {

	entry: {
    bundle: APP_PATH,
    // vendor: ['react','react-dom']
  },
	// devtool: 'source-map',
	output: {
		path: BUILD_PATH,
		publicPath: "/",
		filename: 'bundle.js'
	},
	externals: {
		"react": 'React',
		"react-dom": 'ReactDOM',
		"react-router": 'ReactRouter',
		"antd": 'antd'
  },
	module: {
		// loaders: [
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
				  // plugins: [
				  //   ['import', { libraryName: 'antd', style: 'css' }],
				  // ],
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true
				}
				// query: {
	      //     presets: ['react','es2015'],
	      //     "plugins":[
	      //         ["import",{"libraryName":"antd","style":true}]
	      //     ]
	      // }
				// loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
				// loaders: ['babel-loader?presets[]=es2015,presets[]=react']
			},
			{
			  test: /\.css$/,
			  use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
			},
			// {
			//   test: /\.less$/,
			//   loader: ExtractTextPlugin.extract('style', 'css!less')
			// },
			{
				test: /\.less$/,
				// use: 'style!css!less'
				use: ExtractTextPlugin.extract({ fallback: 'style-loader', use:[
          // "style-loader",
          "css-loader",
          "less-loader"
        ] })
				// use: [
        //   "style-loader",
        //   "css-loader",
        //   "less-loader"
        // ]
			},
			{
	  		test: /\.(png|jpg)$/,
	  		use: 'url?limit=50000'
	  	},
			{test: /\.eot/,use : [
				{
					loader:"file-loader",
					options:{prefix:'font/'}
				}
			]},
			{test: /\.woff/,use : [
				{
					loader:"file-loader",
					options:{prefix:'font/',limit:"10000",mimetype:"application/font-woff"}
				}
			]},
			{test: /\.ttf/,use : [
				{
					loader:"file-loader",
					options:{prefix:'font/'}
				}
			]},
			{test: /\.svg/,use : [
				{
					loader:"file-loader",
					options:{prefix:'font/'}
				}
			]},
		]
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),

		new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
		new webpack.optimize.UglifyJsPlugin({
				minimize: true,
        // mangle: {
        //     except: ['$super', '$', 'exports', 'require', 'module', '_']
        // },
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    })

	]

}
