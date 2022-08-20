module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-editor-lowcode/dist/'
        : './'
}