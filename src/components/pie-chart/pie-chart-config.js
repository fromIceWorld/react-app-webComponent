import { type1 } from './list/type1';
import { type2 } from './list/type2';
const PIE_CHART_CONFIG = {
    className: 'PieChart',
    html: [
        {
            name: '预制配置',
            config: {
                list: {
                    type: 'json-string',
                    options: [
                        {
                            label: '浅色',
                            value: type1,
                        },
                        {
                            label: '深色',
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
                    value: String.raw`option = {
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
                            show: false,
                            trigger: 'item',
                        },
                        legend: {
                            show: false,
                            orient: 'vertical',
                            left: 'auto',
                            right: '10px',
                            top: 'center',
                            bottom: 'auto',
                            align: 'right',
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['47%', '60%'],
                                labelLine: {
                                    show: false,
                                },
                                label: {
                                    show: false,
                                    position: 'center',
                                },
                                emphasis: {
                                    disabled: false,
                                    label: {
                                        show: true,
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        formatter: '{x1|{c}}\n{x2|{b}}',
                                        rich: {
                                            x1: {
                                                color: '#7b7b7b',
                                                lineHeight: 20,
                                                fontSize: 20,
                                            },
                                            x2: {
                                                color: '#4d4d4d',
                                                height: 30,
                                                fontSize: 25,
                                            },
                                        },
                                    },
                                },
                                data: [
                                    { value: 1048, name: 'Search Engine' },
                                    { value: 735, name: 'Direct' },
                                    { value: 580, name: 'Email' },
                                    { value: 484, name: 'Union Ads' },
                                ],
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
        //     name: 'tooltip配置项',
        //     config: {
        //         tooltip: {
        //             type: 'object-config',
        //             value: {
        //                 show: {
        //                     type: 'boolean',
        //                     value: false,
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
        //     name: 'series配置项',
        //     config: {
        //         series: {
        //             type: 'array-config',
        //             value: [
        //                 {
        //                     type: 'object-config',
        //                     value: {
        //                         radius: {
        //                             type: 'slider-list',
        //                             value: [
        //                                 {
        //                                     type: 'slider',
        //                                     value: 47,
        //                                     min: 0,
        //                                     max: 100,
        //                                     postfix: '%',
        //                                 },
        //                                 {
        //                                     type: 'slider',
        //                                     value: 60,
        //                                     min: 0,
        //                                     max: 100,
        //                                     postfix: '%',
        //                                 },
        //                             ],
        //                         },
        //                         labelLine: {
        //                             type: 'object-config',
        //                             value: {
        //                                 show: {
        //                                     type: 'boolean',
        //                                     value: false,
        //                                 },
        //                             },
        //                         },
        //                         label: {
        //                             type: 'object-config',
        //                             value: {
        //                                 show: {
        //                                     type: 'boolean',
        //                                     value: false,
        //                                 },
        //                                 position: {
        //                                     type: 'select',
        //                                     options: [
        //                                         {
        //                                             label: 'center',
        //                                             value: 'center',
        //                                         },
        //                                         {
        //                                             label: 'outside',
        //                                             value: 'outside',
        //                                         },
        //                                         {
        //                                             label: 'inside',
        //                                             value: 'inside',
        //                                         },
        //                                     ],
        //                                     value: 'center',
        //                                 },
        //                             },
        //                         },
        //                         data: {
        //                             type: 'json',
        //                             value: '[{"value":1048,"name":"Search Engine"},{"value":735,"name":"Direct"},{"value":580,"name":"Email"},{"value":484,"name":"Union Ads"}]',
        //                         },
        //                         emphasis: {
        //                             type: 'object-config',
        //                             value: {
        //                                 disabled: {
        //                                     type: 'boolean',
        //                                     value: false,
        //                                 },
        //                                 label: {
        //                                     type: 'object-config',
        //                                     value: {
        //                                         show: {
        //                                             type: 'boolean',
        //                                             value: true,
        //                                         },
        //                                         fontSize: {
        //                                             type: 'number',
        //                                             value: 20,
        //                                         },
        //                                         formatter: {
        //                                             type: 'string',
        //                                             value: '{x1|{c}}\n{x2|{b}}',
        //                                         },
        //                                         rich: {
        //                                             type: 'object-config',
        //                                             value: {
        //                                                 x1: {
        //                                                     type: 'object-config',
        //                                                     value: {
        //                                                         color: {
        //                                                             type: 'color',
        //                                                             value: '#7b7b7b',
        //                                                         },
        //                                                         lineHeight: {
        //                                                             type: 'number',
        //                                                             value: 15,
        //                                                         },
        //                                                         fontSize: {
        //                                                             type: 'number',
        //                                                             value: 15,
        //                                                         },
        //                                                     },
        //                                                 },
        //                                                 x2: {
        //                                                     type: 'object-config',
        //                                                     value: {
        //                                                         color: {
        //                                                             type: 'color',
        //                                                             value: '#4d4d4d',
        //                                                         },
        //                                                         lineHeight: {
        //                                                             type: 'number',
        //                                                             value: 20,
        //                                                         },
        //                                                         fontSize: {
        //                                                             type: 'number',
        //                                                             value: 20,
        //                                                         },
        //                                                     },
        //                                                 },
        //                                             },
        //                                         },
        //                                     },
        //                                 },
        //                             },
        //                         },
        //                     },
        //                 },
        //             ],
        //         },
        //     },
        // },
        // {
        //     name: '自动轮播',
        //     config: {
        //         auto: {
        //             type: 'boolean',
        //             value: true,
        //         },
        //     },
        // },
    ],
    component: {
        input: ['data', 'options'],
        event: [],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['option', 'data'],
    },
};
export { PIE_CHART_CONFIG };
