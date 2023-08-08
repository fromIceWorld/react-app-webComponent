const BAR_CHART_CONFIG = {
    className: 'BarChart',
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
            value: '[{"type":"bar","data":[193,234,310,1215,1341,3818,400]},{"type":"bar","data":[193,234,310,1215,1341,4681,400]}]',
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
export { BAR_CHART_CONFIG };
