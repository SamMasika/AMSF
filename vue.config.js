const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    historyApiFallback: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
})
