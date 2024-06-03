// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
        {
            id: 'line-chart',
            name: '折线图',
            type: 'node',
            icon: '#icon-tubiao-zhexiantu',
            title: `折线图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '基础的折线图',
            component: 'LineChart',
        },
        {
            id: 'bar-chart',
            name: '柱状图',
            type: 'node',
            icon: '#icon-zhuzhuangtu',
            title: `柱状图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '基础的柱状图',
            component: 'BarChart',
        },
        {
            id: 'pie-chart',
            name: '饼状图',
            type: 'node',
            icon: '#icon-bingzhuangtu',
            title: `饼状图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '基础的饼状图',
            component: 'PieChart',
        },
        {
            id: 'three-pie-chart',
            name: '3d饼状图',
            type: 'node',
            icon: '#icon-bingzhuangtu',
            title: `3d饼状图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '3d饼状图',
            component: 'ThreePieChart',
        },
        {
            id: 'china-map',
            name: 'echarts地图',
            type: 'node',
            icon: '#icon-a-2',
            title: `地图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '基础的地图',
            component: 'ChinaMapChart',
        },
    ],
    folderPath = './build';
const fs = require('fs'),
    http = require('http'),
    path = require('path'),
    request = require('request');
const filesName = [
    {
        name: 'static/js/main.js',
        decorator: { defer: true },
    },
    'static/css/main.css',
];
const area = 'react';
components.map((item) => {
    item['filesName'] = filesName;
    item['area'] = area;
});
let options = {
    url: 'http://127.0.0.1:3000/upload',
    method: 'POST',
    headers: {
        'content-type': 'multipart/form-data',
    },
    formData: {
        files: [],
        area,
        components: JSON.stringify(components),
    },
};
// 递归遍历文件夹中的所有文件
function uploadFolder(folderPath, dir) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
        const filePath = folderPath + '/' + file;
        // 判断是否为文件夹
        if (fs.statSync(filePath).isDirectory()) {
            // 递归上传子文件夹
            uploadFolder(filePath, dir + '/' + file);
        } else {
            // 上传文件
            uploadFile(filePath, dir, file);
        }
    });
}

// 缓存上传文件
function uploadFile(filePath, dir, fileName) {
    const content = fs.readFileSync(path.resolve(__dirname, filePath));
    // @ts-ignore
    options.formData.files.push({
        content: Buffer.from(content).toString(),
        dir,
        fileName,
    });
}
// 将文件缓存
uploadFolder(folderPath, '');
console.log('共上传文件数：', options.formData.files.length);
//@ts-ignore
options.formData.files = JSON.stringify(options.formData.files);
request(options, (err, res, body) => {
    if (res.statusCode === 200) {
        console.log('上传完成');
    } else {
        console.log(body);
    }
});
