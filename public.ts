// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
        {
            id: 'line-chart',
            type: 'node',
            icon: 'area-chart',
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
            type: 'node',
            icon: 'bar-chart',
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
            type: 'node',
            icon: 'pie-chart',
            title: `饼状图:
                        react@18+echarts`,
            view: 0,
            family: 'chart',
            color: '#61dafb',
            des: '基础的饼状图',
            component: 'PieChart',
        },
        {
            id: 'china-map',
            type: 'node',
            icon: 'heat-map',
            title: `地图:
                        react@18+echarts`,
            view: 4,
            family: 'chart',
            color: '#61dafb',
            des: '基础的地图',
            component: 'ChinaMapChart',
        },
        {
            id: 'backend-image',
            type: 'node',
            icon: 'file-image',
            title: `背景图:
                        react@18+echarts`,
            view: 4,
            family: 'chart',
            color: '#61dafb',
            des: '基础的背景图',
            component: 'BackgroundImage',
        },
    ],
    fileJS = './build/static/js/',
    fileCSS = './build/static/css/';
const http = require('http'),
    request = require('request');
const filesName = [
    {
        decorator: { defer: true },
        name: 'main.js',
    },
    'main.css',
];
let options = {
    url: 'http://127.0.0.1:3000/upload',
    method: 'POST',
    json: true,
    headers: {
        'content-type': 'application/json',
    },
    body: {},
};
let files = [],
    area = 'react';
filesName.forEach((fileName) => {
    let name = typeof fileName == 'string' ? fileName : fileName.name;
    let content = require('fs').readFileSync(
        (name.endsWith('.js') ? fileJS : fileCSS) + name
    );
    let buffer = Buffer.from(content);
    //@ts-ignore
    files.push({
        name,
        content: buffer.toString(),
    });
});
let componentsConfig = components.map((item) => {
    return {
        ...item,
        filesName,
        area,
    };
});
request(
    {
        ...options,
        body: {
            code: 200,
            data: {
                components: componentsConfig,
                content: files,
                area,
            },
        },
    },
    (err, res, body) => {
        console.log('上传', res.statusCode);
        if (res.statusCode === 200) {
            console.log(filesName, res.statusCode, '上传完成');
        }
    }
);
