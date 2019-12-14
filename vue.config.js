module.exports = {
    outputDir: __dirname + '/dist/public',
    configureWebpack: {
        entry: './src/front/main.ts',
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json']
        }
    },

    chainWebpack: config => {
        config
            .plugin('fork-ts-checker')
            .use(require('fork-ts-checker-webpack-plugin'), [{
                tsconfig: 'tsconfig.front.json',
            }])

        config
            .plugin('html')
            .tap(args => {
                args[0].template = 'src/front/public/index.html'
                return args
            })

        config
            .plugin('copy')
            .use(require('copy-webpack-plugin'), [[{
                from: 'src/front/public'
            }]])

        config.resolve.alias.delete("@")
        config.resolve
            .plugin("tsconfig-paths")
            .use(require("tsconfig-paths-webpack-plugin"))
    }
}