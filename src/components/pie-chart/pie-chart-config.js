const PIE_CHART_CONFIG = {
    className: 'PieChart',
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
        data: {
            type: 'json',
            value: '[{"value":1048,"name":"Search Engine"},{"value":735,"name":"Direct"},{"value":580,"name":"Email"},{"value":484,"name":"Union Ads"}]',
        },
    },
    css: {},
    component: {
        event: [],
        methods: [{ label: 'setData', value: 'setData' }],
        data: ['config'],
        params: [],
    },
};
export { PIE_CHART_CONFIG };
