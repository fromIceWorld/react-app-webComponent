const LINE_CHART_CONFIG = {
    className: 'LineChart',
    tag: '',
    html: {
        title: {
            type: 'string',
            value: '',
        },
        color: {
            type: 'json',
            value: "['#5470c6', '#91cc75','#fac858','#ee6666','#73c0de','#3ba272', '#fc8452','#9a60b4','#ea7ccc',]",
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
    css: {},
    component: {
        event: [{ label: 'initCompleted', value: 'initCompleted' }],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { LINE_CHART_CONFIG };
