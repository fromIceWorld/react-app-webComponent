import { type1 } from './list/type1';
import { type2 } from './list/type2';
const BAR_CHART_CONFIG = {
    className: 'BarChart',
    html: [
        {
            name: '预制配置',
            config: {
                list: {
                    type: 'json-string',
                    options: [
                        {
                            label: '多色图',
                            value: type1,
                        },
                        {
                            label: '深色图',
                            value: type2,
                        },
                    ],
                    value: '',
                },
            },
        },
        {
            name: '自定义代码',
            config: {
                code: {
                    type: 'custom-code',
                    value: `option = {
                        title: {
                            show: false,
                            text: 'title',
                            link: '',
                            left: '10px',
                            top: '10px',
                            right: 'auto',
                            bottom: 'auto',
                        },
                        color: [
                            '#f48282',
                            '#f8de83',
                            '#9dc9ff',
                            '#a2d5ea',
                            '#b8c5dd',
                            '#5c81b1',
                            '#f7c0c0',
                            '#b4d0e8',
                            '#f1a26e',
                        ],
                        tooltip: {
                            show: true,
                            orient: 'vertical',
                            left: 'auto',
                            right: '10px',
                            top: 'center',
                            bottom: 'auto',
                            align: 'right',
                            trigger: 'axis',
                            data: [],
                        },
                        legend: {
                            show: true,
                            orient: 'vertical',
                            left: 'auto',
                            right: '10px',
                            top: 'center',
                            bottom: 'auto',
                            align: 'right',
                            data: [
                                'Email',
                                'Union Ads',
                                'Video Ads',
                                'Direct',
                                'Search Engine',
                            ],
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top: '10%',
                            containLabel: true,
                        }, //边距
                        xAxis: {
                            type: 'category',
                            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
                        },
                        yAxis: {
                            type: 'value',
                            value: [],
                        },
                        series: [
                            {
                                name: '2011',
                                type: 'bar',
                                data: [18203, 23489, 29034, 104970, 131744, 630230],
                            },
                            {
                                name: '2012',
                                type: 'bar',
                                data: [19325, 23438, 31000, 121594, 134141, 681807],
                            },
                        ],
                    };`,
                },
            },
        },
        // {
        //     name: '颜色配置',
        //     config: {
        //         color: {
        //             type: 'colors',
        //             value: [
        //                 '#f48282',
        //                 '#f8de83',
        //                 '#9dc9ff',
        //                 '#a2d5ea',
        //                 '#b8c5dd',
        //                 '#5c81b1',
        //                 '#f7c0c0',
        //                 '#b4d0e8',
        //                 '#f1a26e',
        //             ],
        //         },
        //     },
        // },
        // {
        //     name: 'title配置项',
        //     config: {
        //         title: {
        //             type: 'object-config',
        //             value: {
        //                 show: {
        //                     type: 'boolean',
        //                     value: false,
        //                 },
        //                 text: {
        //                     type: 'string',
        //                     value: 'title',
        //                 },
        //                 link: {
        //                     type: 'string',
        //                     value: '',
        //                 },
        //                 left: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'auto', value: 'auto' },
        //                         { label: 'left', value: 'left' },
        //                         { label: 'right', value: 'right' },
        //                         { label: 'center', value: 'center' },
        //                     ],
        //                     value: '10px',
        //                 },

        //                 top: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'auto', value: 'auto' },
        //                         { label: 'top', value: 'top' },
        //                         { label: 'middle', value: 'middle' },
        //                         { label: 'bottom', value: 'bottom' },
        //                     ],
        //                     value: '10px',
        //                 },
        //                 right: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'auto', value: 'auto' },
        //                         { label: 'left', value: 'left' },
        //                         { label: 'right', value: 'right' },
        //                         { label: 'center', value: 'center' },
        //                     ],
        //                     value: 'auto',
        //                 },
        //                 bottom: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'auto', value: 'auto' },
        //                         { label: 'top', value: 'top' },
        //                         { label: 'middle', value: 'middle' },
        //                         { label: 'bottom', value: 'bottom' },
        //                     ],
        //                     value: 'auto',
        //                 },
        //             },
        //         },
        //     },
        // },
        // {
        //     name: '边距配置项',
        //     config: {
        //         grid: {
        //             type: 'object-config',
        //             value: {
        //                 left: {
        //                     type: 'slider',
        //                     value: 3,
        //                     min: 0,
        //                     max: 100,
        //                     postfix: '%',
        //                 },
        //                 top: {
        //                     type: 'slider',
        //                     value: 10,
        //                     min: 0,
        //                     max: 100,
        //                     postfix: '%',
        //                 },
        //                 right: {
        //                     type: 'slider',
        //                     value: 4,
        //                     min: 0,
        //                     max: 100,
        //                     postfix: '%',
        //                 },
        //                 bottom: {
        //                     type: 'slider',
        //                     value: 3,
        //                     min: 0,
        //                     max: 100,
        //                     postfix: '%',
        //                 },
        //             },
        //         },
        //     },
        // },
        // {
        //     name: '图例配置项',
        //     config: {
        //         legend: {
        //             type: 'object-config',
        //             value: {
        //                 show: {
        //                     type: 'boolean',
        //                     value: false,
        //                 },
        //                 orient: {
        //                     type: 'select',
        //                     options: [
        //                         { label: 'vertical', value: 'vertical' },
        //                         { label: 'horizontal', value: 'horizontal' },
        //                     ],
        //                     value: 'vertical',
        //                 },
        //                 align: {
        //                     type: 'select',
        //                     options: [
        //                         { label: 'auto', value: 'auto' },
        //                         { label: 'left', value: 'left' },
        //                         { label: 'right', value: 'right' },
        //                     ],
        //                     value: 'auto',
        //                 },
        //                 left: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'left', value: 'left' },
        //                         { label: 'right', value: 'right' },
        //                         { label: 'center', value: 'center' },
        //                         { label: 'auto', value: 'auto' },
        //                     ],
        //                     value: 'right',
        //                 },
        //                 right: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'left', value: 'left' },
        //                         { label: 'right', value: 'right' },
        //                         { label: 'center', value: 'center' },
        //                         { label: 'auto', value: 'auto' },
        //                     ],
        //                     value: 'right',
        //                 },
        //                 top: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'top', value: 'top' },
        //                         { label: 'middle', value: 'middle' },
        //                         { label: 'bottom', value: 'bottom' },
        //                         { label: 'auto', value: 'auto' },
        //                     ],
        //                     value: 'top',
        //                 },
        //                 bottom: {
        //                     type: 'extend-select',
        //                     options: [
        //                         { label: 'top', value: 'top' },
        //                         { label: 'middle', value: 'middle' },
        //                         { label: 'bottom', value: 'bottom' },
        //                         { label: 'auto', value: 'auto' },
        //                     ],
        //                     value: 'bottom',
        //                 },
        //                 data: {
        //                     type: 'json',
        //                     value: '["Email","Union Ads","Video Ads","Direct","Search Engine"]',
        //                 },
        //             },
        //         },
        //     },
        // },
        // {
        //     name: 'xAxis',
        //     config: {
        //         xAxis: {
        //             type: 'object-config',
        //             value: {
        //                 show: {
        //                     type: 'boolean',
        //                     value: true,
        //                 },
        //                 type: {
        //                     type: 'select',
        //                     options: [
        //                         { label: 'value', value: 'value' },
        //                         { label: 'category', value: 'category' },
        //                         { label: 'time', value: 'time' },
        //                         { label: 'log', value: 'log' },
        //                     ],
        //                     value: 'category',
        //                 },
        //                 data: {
        //                     type: 'json',
        //                     value: '["Brazil","Indonesia","USA","India","China","World"]',
        //                 },
        //             },
        //         },
        //     },
        // },
        // {
        //     name: 'yAxis',
        //     config: {
        //         yAxis: {
        //             type: 'object-config',
        //             value: {
        //                 show: {
        //                     type: 'boolean',
        //                     value: true,
        //                 },
        //                 type: {
        //                     type: 'select',
        //                     options: [
        //                         { label: 'value', value: 'value' },
        //                         { label: 'category', value: 'category' },
        //                         { label: 'time', value: 'time' },
        //                         { label: 'log', value: 'log' },
        //                     ],
        //                     value: 'value',
        //                 },
        //                 data: {
        //                     type: 'json',
        //                     value: '["Brazil","Indonesia","USA","India","China","World"]',
        //                 },
        //             },
        //         },
        //     },
        // },
        // {
        //     name: 'series',
        //     config: {
        //         series: {
        //             type: 'array-config',
        //             value: [
        //                 {
        //                     type: 'object-config',
        //                     value: {
        //                         data: {
        //                             type: 'json',
        //                             value: '[{"name":"2011","type":"bar","data":[18203,23489,29034,104970,131744,630230]},{"name":"2012","type":"bar","data":[19325,23438,31000,121594,134141,681807]}]',
        //                         },
        //                     },
        //                 },
        //             ],
        //         },
        //     },
        // },
    ],
    component: {
        input: ['data', 'options'],
        event: [],
        methods: [],
        data: ['option'],
    },
};
export { BAR_CHART_CONFIG };
