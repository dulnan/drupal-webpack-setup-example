const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DrupalTranslationsWebpackPlugin = require('drupal-translations-webpack-plugin')

const LOCAL_PORT = 9000

module.exports = env => {
  const isProduction = env ? env.production : false

  let output = {
    publicPath: isProduction ? '/themes/mytheme' : `http://localhost:${LOCAL_PORT}/themes/mytheme`
  }

  // Define two entries: One for global styling and behaviors,
  // the other for an imaginary gallery component.
  let entry = {
    global: './src/global.js',
    gallery: './src/gallery.js'
  }

  let resolve = {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }

  let module = {
    rules: [
      {
        // Only load files that match *.behavior.js
        test: /\.behavior.js$/,

        // Define the loader to use.
        loader: 'drupal-behaviors-loader',

        // Exclude node_modules folder.
        exclude: /node_modules/,

        // Optionally define a folder to include specifically.
        // include: /js\/behaviors/,

        // Set the options. Depending on the env, enable
        // or disable injection of the HMR code.
        options: {
          enableHmr: !isProduction
        },
      },

      // This will transpile our JS files using Babel.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // If you want to also compile SCSS files, add this loader.
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }

  let plugins = []

  // Only extract CSS when building assets for production.
  if (isProduction) {
    plugins.push(new MiniCssExtractPlugin({
      // For more information and options, check out
      // https://github.com/webpack-contrib/sass-loader#in-production
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }))

    plugins.push(new DrupalTranslationsWebpackPlugin())
  }

  // Setting up webpack devServer
  let devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: LOCAL_PORT,
    // A more restrictive setting is recommended.
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

  return { output, entry, resolve, module, plugins, devServer }
}
