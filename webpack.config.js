var path = require('path');
var webpack = require("webpack")
module.exports = {
  devServer: {
    clientLogLevel: (process.env.NODE_ENV == "production"?'none':'error')
  },
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'final')
  },

  module: {

    rules: [
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: /index.html/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options:{
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options:{
              data: `@import "variables";`,
              includePaths:[
                path.resolve(__dirname, "src/view")
              ]
            }
          }
        ]
      }
    ]
  },
   resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve('src'),
      "assets": path.resolve("assets")
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        configureWebpack: {
          optimization: {
            splitChunks: false
          }
        },
      }
    })
  ]
};
