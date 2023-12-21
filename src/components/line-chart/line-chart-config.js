const LINE_CHART_CONFIG = {
    className: 'LineChart',
    tag: '',
    html: [
        {
            name: '颜色配置',
            config: {
                color: {
                    type: 'colors',
                    value: [
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
                },
            },
        },
        {
            name: 'title配置项',
            config: {
                title: {
                    type: 'object-config',
                    value: {
                        show: {
                            type: 'boolean',
                            value: false,
                        },
                        text: {
                            type: 'string',
                            value: 'title',
                        },
                        link: {
                            type: 'string',
                            value: '',
                        },
                        left: {
                            type: 'extend-select',
                            options: [
                                { label: 'auto', value: 'auto' },
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                                { label: 'center', value: 'center' },
                            ],
                            value: '10px',
                        },

                        top: {
                            type: 'extend-select',
                            options: [
                                { label: 'auto', value: 'auto' },
                                { label: 'top', value: 'top' },
                                { label: 'middle', value: 'middle' },
                                { label: 'bottom', value: 'bottom' },
                            ],
                            value: '10px',
                        },
                        right: {
                            type: 'extend-select',
                            options: [
                                { label: 'auto', value: 'auto' },
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                                { label: 'center', value: 'center' },
                            ],
                            value: 'auto',
                        },
                        bottom: {
                            type: 'extend-select',
                            options: [
                                { label: 'auto', value: 'auto' },
                                { label: 'top', value: 'top' },
                                { label: 'middle', value: 'middle' },
                                { label: 'bottom', value: 'bottom' },
                            ],
                            value: 'auto',
                        },
                    },
                },
            },
        },
        {
            name: '边距配置项',
            config: {
                grid: {
                    type: 'object-config',
                    value: {
                        left: {
                            type: 'slider',
                            value: 3,
                            min: 0,
                            max: 100,
                            postfix: '%',
                        },
                        top: {
                            type: 'slider',
                            value: 10,
                            min: 0,
                            max: 100,
                            postfix: '%',
                        },
                        right: {
                            type: 'slider',
                            value: 4,
                            min: 0,
                            max: 100,
                            postfix: '%',
                        },
                        bottom: {
                            type: 'slider',
                            value: 3,
                            min: 0,
                            max: 100,
                            postfix: '%',
                        },
                    },
                },
            },
        },
        {
            name: '图例配置项',
            config: {
                legend: {
                    type: 'object-config',
                    value: {
                        show: {
                            type: 'boolean',
                            value: false,
                        },
                        orient: {
                            type: 'select',
                            options: [
                                { label: 'vertical', value: 'vertical' },
                                { label: 'horizontal', value: 'horizontal' },
                            ],
                            value: 'vertical',
                        },
                        align: {
                            type: 'select',
                            options: [
                                { label: 'auto', value: 'auto' },
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                            ],
                            value: 'auto',
                        },
                        left: {
                            type: 'extend-select',
                            options: [
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                                { label: 'center', value: 'center' },
                                { label: 'auto', value: 'auto' },
                            ],
                            value: 'right',
                        },
                        right: {
                            type: 'extend-select',
                            options: [
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                                { label: 'center', value: 'center' },
                                { label: 'auto', value: 'auto' },
                            ],
                            value: 'right',
                        },
                        top: {
                            type: 'extend-select',
                            options: [
                                { label: 'top', value: 'top' },
                                { label: 'middle', value: 'middle' },
                                { label: 'bottom', value: 'bottom' },
                                { label: 'auto', value: 'auto' },
                            ],
                            value: 'top',
                        },
                        bottom: {
                            type: 'extend-select',
                            options: [
                                { label: 'top', value: 'top' },
                                { label: 'middle', value: 'middle' },
                                { label: 'bottom', value: 'bottom' },
                                { label: 'auto', value: 'auto' },
                            ],
                            value: 'bottom',
                        },
                        data: {
                            type: 'json',
                            value: '["Email","Union Ads","Video Ads","Direct","Search Engine"]',
                        },
                    },
                },
            },
        },
        {
            name: 'xAxis',
            config: {
                xAxis: {
                    type: 'object-config',
                    value: {
                        show: {
                            type: 'boolean',
                            value: true,
                        },
                        data: {
                            type: 'json',
                            value: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
                        },
                    },
                },
            },
        },
        {
            name: 'yAxis',
            config: {
                yAxis: {
                    type: 'object-config',
                    value: {
                        show: {
                            type: 'boolean',
                            value: true,
                        },
                    },
                },
            },
        },
        {
            name: 'series',
            config: {
                series: {
                    type: 'json',
                    value: '[{"name":"Email","type":"line","stack":"Total","showSymbol":false,"smooth":true,"data":[120,132,101,134,90,230,210]},{"name":"Union Ads","type":"line","smooth":true,"lineStyle":{"type":"solid"},"stack":"Total","showSymbol":false,"data":[220,182,191,234,290,330,310]},{"name":"Video Ads","type":"line","smooth":true,"showSymbol":false,"stack":"Total","data":[150,232,201,154,190,330,410]},{"name":"Direct","type":"line","smooth":true,"showSymbol":false,"stack":"Total","data":[320,332,301,334,390,330,320]},{"name":"Search Engine","type":"line","stack":"Total","smooth":true,"showSymbol":false,"data":[820,932,901,934,1290,1330,1320]}]',
                },
            },
        },
    ],
    component: {
        event: [{ label: 'initCompleted', value: 'initCompleted' }],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { LINE_CHART_CONFIG };
