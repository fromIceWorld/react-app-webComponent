export const type1 = `
option = {
    color: ['#58e2f1'],
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        top: '7%',
        left: '2%',
        right: '6%',
        bottom: '0%',
        containLabel: true,
    },
    xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        splitLine: {
            show: false,
            lineStyle: {
                color: '#192c65',
            },
        },
        axisLabel: {
            fontFamily: 'Microsoft YaHei',
        },
        axisTick: {
            show: false,
        },
    },
    yAxis: {
        show: false,
        type: 'value',
        scale: true,
        min: 0,
        boundaryGap: [0.2, 0.2],
        axisLine: {
            show: false,
            lineStyle: {
                color: '#4a70b3',
            },
        },
        nameTextStyle: {
            fontFamily: 'Microsoft YaHei',
        },
        axisTick: {
            show: false,
        },
    },
    series: [
        {
            showSymbol: false,
            name: '',
            type: 'line',
            smooth: true,
            stack: 'Total',
            data: [
                ['05-17', 80],
                ['05-18', 50],
                ['05-19', 70],
                ['05-20', 130],
                ['05-21', 50],
                ['05-22', 98],
                ['05-23', 110],
            ],
            lineStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#f7b600', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#69afd2', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#f7b600', // 0% 处的颜色
                        },
                        {
                            offset: 0.4,
                            color: '#fff0', // 0% 处的颜色
                        },

                        {
                            offset: 1,
                            color: '#fff0', // 0% 处的颜色
                        },
                    ],
                },
            },
        },
    ],
};`;
