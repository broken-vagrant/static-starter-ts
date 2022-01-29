const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    index: './src/ts/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].bundle.js',
    assetModuleFilename: 'images/[name][ext]',
    clean: true
  },
  devServer: {
    static: ['public'],
    watchFiles: ['src/**/*', 'index.html'],
    client: {
      logging: 'none',
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "assets/[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/'), to: '.' },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // CSS Modules
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          "css-loader",
        ]
      },
      {
        // SCSS Modules
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          "css-loader",

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("sass"),
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  }
};
