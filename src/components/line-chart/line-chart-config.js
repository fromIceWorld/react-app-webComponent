const LINE_CHART_CONFIG = {
    className: 'LineChart',
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
        xData: {
            type: 'json',
            value: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
        },
        series: {
            type: 'json',
            value: '[{"name":"销量","type":"line","data":[5,20,36,10,10,20,0]},{"name":"销量2","type":"line","data":[15,30,46,20,20,30,0]}]',
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
export { LINE_CHART_CONFIG };
