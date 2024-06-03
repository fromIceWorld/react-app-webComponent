const CHART_IMAGE_CONFIG = {
    className: 'ChinaMapChart',
    html: [
        {
            name: '模板',
            config: {
                type: {
                    type: 'select',
                    options: [
                        {
                            label: '模板1',
                            value: 'type1',
                        },
                        {
                            label: '模板2',
                            value: 'type2',
                        },
                        {
                            label: '世界地图',
                            value: 'world',
                        },
                    ],
                    value: 'world',
                },
                area: {
                    type: 'select',
                    options: [
                        {
                            label: '中国地图',
                            value: 'china',
                        },
                        {
                            label: '世界地图+图片',
                            value: 'world',
                        },
                    ],
                    value: 'world',
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
        data: ['effectScatters', 'linesData', 'heatmapData'],
        params: [],
    },
};
export { CHART_IMAGE_CONFIG };
