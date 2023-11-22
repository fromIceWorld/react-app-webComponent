const CHINA_MAP_CONFIG = {
    className: 'ChinaMapChart',
    html: [
        {
            name: '基础配置',
            config: {
                title: {
                    type: 'string',
                    value: 'demo组件',
                },
            },
        },
    ],
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
