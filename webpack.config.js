var path = require('path');
module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'), // 输出路径
        filename: 'bundle.js',
    },
};
