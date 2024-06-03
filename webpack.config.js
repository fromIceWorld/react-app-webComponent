var path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
new ModuleFederationPlugin({
    // 应用名，全局唯一，不可冲突。
    name: 'react_app',
    // 暴露的文件名称
    filename: 'remoteEntry.js',
    // 远程应用暴露出的模块名。
    exposes: {
        './BarChart': './src/bar-chart/bar-chart.js',
    },
    // 依赖包 依赖的包 webpack在加载的时候会先判断本地应用是否存在对应的包，如果不存在，则加载远程应用的依赖包。
    shared: {
        react: {
            singleton: true,
        },
        moment: {
            singleton: true,
        },
    },
});

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出路径
        filename: 'bundle.js',
    },
};
