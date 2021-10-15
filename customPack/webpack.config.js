// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

// vue-loader
const { VueLoaderPlugin } = require("vue-loader");

const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./app.vue"),
  externals: {
    //包名:  modulex.exports 的名字
    vue: "Vue",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    library: "MyPlugin",
    libraryTarget: "umd",
  },
  plugins: [
    // 引入插件
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      // vue
      {
        test: /\.vue/,
        use: ["vue-loader"],
      },
      // JS
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // 开始
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: {
                    version: 3,
                  },
                  //   targets: {
                  //     chrome: '60',
                  //     firefox: '60',
                  //     ie: '9',
                  //     safari: '10',
                  //     edge: '17',
                  //   },
                },
              ],
              // 结束
            ],
          },
        },
      },
      // CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
};
