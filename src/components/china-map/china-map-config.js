const CHINA_MAP_CONFIG = {
    className: 'ChinaMapChart',
    tag: '',
    html: {
        title: {
            type: 'string',
            value: 'demo组件',
        },
    },
    css: {},
    component: {
        event: [{ label: 'initCompleted', value: 'initCompleted' }],
        methods: [
            { label: 'clearAllData', value: 'clearAllData' },
            { label: 'clearEffectScatter', value: 'clearEffectScatter' },
            { label: 'clearLines', value: 'clearLines' },
            { label: 'clearHeat', value: 'clearHeat' },
        ],
        data: ['effectScattereData', 'linesData', 'heatmapData'],
        params: [],
    },
};
export { CHINA_MAP_CONFIG };
