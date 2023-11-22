const LINE_CHART_CONFIG = {
    className: 'LineChart',
    tag: '',
    html: [
        {
            name: '基础配置',
            config: {
                color: {
                    type: 'colors',
                    value: [
                        '#5470c6',
                        '#91cc75',
                        '#fac858',
                        '#ee6666',
                        '#73c0de',
                        '#3ba272',
                        '#fc8452',
                        '#9a60b4',
                        '#ea7ccc',
                    ],
                },
                xData: {
                    type: 'json',
                    value: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
                },
                series: {
                    type: 'json',
                    value: '[{"name":"销量","type":"line","data":[5,20,36,10,10,20,0]},{"name":"销量2","type":"line","data":[15,30,46,20,20,30,0]}]',
                },
            },
        },
        {
            name: 'title',
            config: {
                show: {
                    type: 'boolean',
                    value: true,
                },
                text: {
                    type: 'string',
                    value: '',
                },
                link: {
                    type: 'string',
                    value: '',
                },
                left: {
                    type: 'select',
                    options: [
                        { label: 'left', value: 'left' },
                        { label: 'right', value: 'right' },
                        { label: 'center', value: 'center' },
                    ],
                    value: 'left',
                },
                top: {
                    type: 'select',
                    options: [
                        { label: 'top', value: 'top' },
                        { label: 'middle', value: 'middle' },
                        { label: 'bottom', value: 'bottom' },
                    ],
                    value: 'top',
                },
            },
        },
        {
            name: '边距',
            config: {
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
        {
            name: '图例',
            config: {
                show: {
                    type: 'boolean',
                    value: true,
                },
                left: {
                    type: 'extend-select',
                    options: [
                        { label: 'left', value: 'left' },
                        { label: 'right', value: 'right' },
                        { label: 'center', value: 'center' },
                        { label: 'null', value: null },
                    ],
                    value: 'right',
                },
                right: {
                    type: 'extend-select',
                    options: [
                        { label: 'left', value: 'left' },
                        { label: 'right', value: 'right' },
                        { label: 'center', value: 'center' },
                        { label: 'null', value: null },
                    ],
                    value: 'right',
                },
                top: {
                    type: 'extend-select',
                    options: [
                        { label: 'top', value: 'top' },
                        { label: 'middle', value: 'middle' },
                        { label: 'bottom', value: 'bottom' },
                        { label: 'null', value: null },
                    ],
                    value: 'top',
                },
                bottom: {
                    type: 'extend-select',
                    options: [
                        { label: 'top', value: 'top' },
                        { label: 'middle', value: 'middle' },
                        { label: 'bottom', value: 'bottom' },
                        { label: 'null', value: null },
                    ],
                    value: 'bottom',
                },
            },
        },
        {
            name: 'xAxis',
            config: {
                show: {
                    type: 'boolean',
                    value: true,
                },
            },
        },
        {
            name: 'yAxis',
            config: {
                show: {
                    type: 'boolean',
                    value: true,
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
