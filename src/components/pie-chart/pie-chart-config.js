const PIE_CHART_CONFIG = {
    className: 'PieChart',
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
                series: {
                    type: 'json',
                    value: '[{"value":1048,"name":"Search Engine"},{"value":735,"name":"Direct"},{"value":580,"name":"Email"},{"value":484,"name":"Union Ads"}]',
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
    ],
    component: {
        event: [],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { PIE_CHART_CONFIG };
