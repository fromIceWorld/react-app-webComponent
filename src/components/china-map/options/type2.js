import * as echarts from 'echarts';

export const type2_option = {
    geo: {
        map: '500000',
        silent: false,
        type: 'map',
        zoom: 0.94,
        top: 80,
        aspectScale: 0.85,

        itemStyle: {
            normal: {
                areaColor: '#fff0',
                borderWidth: 0,
            },
        },
    },
    series: [
        {
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6, //箭头指向速度，值越小速度越快
                trailLength: 0.7, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'circle', //箭头图标
                symbolSize: 4, //图标大小
            },
            lineStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0.5,
                        0.5,
                        0.5,
                        0,
                        [
                            {
                                offset: 0,
                                color: '#e78864',
                            },

                            {
                                offset: 0,
                                color: 'white',
                            },
                        ]
                    ),
                    width: 0, //尾迹线条宽度
                    opacity: 0.5, //尾迹线条透明度
                    curveness: 0.3, //尾迹线条曲直度
                },
            },
            data: [],
        },
        {
            type: 'effectScatter',
            effectType: 'ripple',
            showEffectOn: 'render',
            rippleEffect: {
                color: 'red',
                number: 3,
                period: 4,
            },
            symbol: 'circle',
            data: [],
        },
    ],
};
