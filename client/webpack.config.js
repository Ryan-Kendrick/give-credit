const { join } = require('node:path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: join(__dirname, './index.tsx'),
  output: {
    path: join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      // {
      //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      //   loader: require.resolve('url-loader'),
      //   options: {
      //     limit: 10000,
      //     name: 'static/media/[name].[hash:8].[ext]',
      //   },
      // },
      // {
      //   test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
      //   loader: require.resolve('file-loader'),
      //   options: {
      //     name: '/static/media/[name].[hash:8].[ext]',
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
