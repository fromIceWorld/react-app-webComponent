const BAR_CHART_CONFIG = {
    className: 'BarChart',
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
            value: '[{"type":"bar","data":[193,234,310,1215,1341,3818,400]},{"type":"bar","data":[193,234,310,1215,1341,4681,400]}]',
        },
    },
    css: {
        classes: '',
        style: {},
    },
    component: {
        event: [],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { BAR_CHART_CONFIG };
