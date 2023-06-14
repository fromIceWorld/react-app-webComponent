const PIE_CHART_CONFIG = {
    className: 'PieChart',
    tag: '',
    html: {
        title: {
            type: 'string',
            value: '',
        },
        width: {
            type: 'string',
            value: '400px',
        },
        height: {
            type: 'string',
            value: '200px',
        },
        data: {
            type: 'json',
            value: '[{"value":1048,"name":"Search Engine"},{"value":735,"name":"Direct"},{"value":580,"name":"Email"},{"value":484,"name":"Union Ads"}]',
        },
    },
    css: {
        classes: '',
        style: {},
        width: {
            type: 'number',
            value: 0,
        },
        height: {
            type: 'number',
            value: 0,
        },
    },
    component: {
        event: [],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { PIE_CHART_CONFIG };
