export const type1_option = {
    title: {
        text: 'demo组件',
        show: false,
    },
    animationDurationUpdate: 0,
    geo: [
        {
            map: '500000',
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            show: true,
            roam: false,
            label: {
                emphasis: {
                    show: false,
                },
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(192,245,249,.8)',
                    borderWidth: 4,
                    shadowColor: '#6FFDFF',
                    shadowOffsetY: 0,
                    shadowBlur: 10,
                    areaColor: 'rgba(29,85,139,.6)',
                },
            },
            emphasis: {
                areaColor: 'rgba(29,85,139,.6)',
            },
        },
        {
            map: '500000',
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            show: true,
            roam: false,
            label: {
                emphasis: {
                    show: false,
                },
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(192,245,249,.8)',
                    borderWidth: 3,
                    shadowColor: '#2C99F6',
                    shadowOffsetY: 0,
                    shadowBlur: 12,
                    areaColor: 'rgba(29,85,139,.6)',
                },
            },
            emphasis: {
                areaColor: 'rgba(29,85,139,.6)',
            },
        },
        //重影
        {
            type: 'map',
            map: '500000',
            zlevel: -1,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '50.7%'],
            layoutSize: '180%',
            roam: false,
            silent: true,
            itemStyle: {
                normal: {
                    borderWidth: 6,
                    borderColor: 'rgba(29, 111, 165,1)',
                    shadowColor: 'rgba(29, 111, 165,0.5)',
                    shadowOffsetY: 15,
                    shadowBlur: 8,
                    areaColor: 'rgba(5,21,35,0.1)',
                },
            },
        },
        {
            type: 'map',
            map: '500000',
            zlevel: -2,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '51.0%'],
            layoutSize: '180%',
            roam: false,
            silent: true,
            itemStyle: {
                normal: {
                    borderWidth: 6,
                    borderColor: 'rgba(29, 111, 165,1)',
                    shadowColor: 'rgba(29, 111, 165,0.5)',
                    shadowOffsetY: 10,
                    shadowBlur: 8,
                    areaColor: 'rgba(5,21,35,0.1)',
                },
            },
        },
        {
            type: 'map',
            map: '500000',
            zlevel: -3,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '51.4%'],
            layoutSize: '180%',
            roam: false,
            silent: true,
            itemStyle: {
                normal: {
                    borderWidth: 6,
                    borderColor: 'rgba(29, 111, 165,1)',
                    shadowColor: 'rgba(29, 111, 165,0.5)',
                    shadowOffsetY: 10,
                    shadowBlur: 8,
                    areaColor: 'rgba(5,21,35,0.1)',
                },
            },
        },
    ],
    series: [
        // 地图边界描边配置
        {
            type: 'map',
            map: '500000',
            tooltip: {
                trigger: 'item',
                position: 'inside',
                formatter: function (item) {
                    var tipHtml = '';
                    tipHtml =
                        '<div style="font-size: 16px;height: 28px;line-height: 30px;background:#000259;opacity: 0.75;border-radius: 3px;color:#fff">' +
                        '&nbsp;&nbsp;' +
                        item.data.name +
                        '&nbsp;&nbsp;&nbsp;' +
                        item.data.value +
                        '人&nbsp;&nbsp;' +
                        '</span>' +
                        '</div>';
                    return tipHtml;
                },
            },
            name: '数据',
            aspectScale: 1,
            zoom: 0.65, //缩放
            showLegendSymbol: false,
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false,
                },
            },
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 300,
                        x2: 0,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'RGBA(37,108,190,1)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'RGBA(15,169,195,1)', // 50% 处的颜色
                            },
                        ],
                        global: true, // 缺省为 false
                    },
                    borderColor: '#4ECEE6',
                    borderWidth: 1,
                },
                emphasis: {
                    // areaColor: {
                    //     type: 'linear-gradient',
                    //     x: 0,
                    //     y: 300,
                    //     x2: 0,
                    //     y2: 0,
                    //     colorStops: [
                    //         {
                    //             offset: 0,
                    //             color: 'RGBA(37,108,190,1)', // 0% 处的颜色
                    //         },
                    //         {
                    //             offset: 1,
                    //             color: 'RGBA(15,169,195,1)', // 50% 处的颜色
                    //         },
                    //     ],
                    //     global: true, // 缺省为 false
                    // },
                    areaColor: '#bb912c',
                },
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            markPoint: {
                symbol: 'none',
            },
        },
        {
            name: 'circle',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            // this.effectScatterConvertData([
            // { name: '北京市', value: 440 },
            // { name: '江苏省', value: 44 },
            // { name: '浙江省', value: 44 },
            // { name: '辽宁省', value: 44 },
            // { name: '海南省', value: 44 },
            // { name: '新疆维吾尔自治区', value: 44 },
            // {
            //     name: '苏尼特左旗',
            //     value: [113.653412, 43.854108, 4500],
            // },
            // ]),
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                },
            },
            itemStyle: {
                normal: {
                    color: '#98e574',
                    shadowBlur: 45,
                    shadowColor: '#0a99ff',
                    shadowOffsetY: 10,
                },
            },
            zlevel: 1,
        },
        {
            type: 'lines',
            zlevel: 50,
            effect: {
                show: true,
                period: 8,
                trailLength: 0.01,
                symbol: 'arrow',
                symbolSize: 5,
            },
            lineStyle: {
                normal: {
                    curveness: 0.5,
                    width: 1,
                    opacity: 1,
                },
            },
            data: [],
            // this.lineConvertData([
            // [{ name: '北京市' }, { name: '江苏省' }, { value: 0 }],
            // [{ name: '浙江省' }, { name: '辽宁省' }, { value: 0 }],
            // [{ name: '辽宁省' }, { name: '海南省' }, { value: 0 }],
            // [
            //     {
            //         name: '苏尼特左旗',
            //         coord: [113.653412, 43.854108],
            //     },
            //     { name: '海南省' },
            //     { value: 0 },
            // ],
            // [
            //     {
            //         name: '新疆维吾尔自治区',
            //     },
            //     { name: '海南省' },
            //     { value: 0 },
            // ],
            // [
            //     { name: '海南省' },
            //     {
            //         name: '新疆维吾尔自治区',
            //     },
            //     { value: 0 },
            // ],
            // ]),
        },
        // {
        //     name: '机构发表文献被引次数',
        //     type: 'heatmap',
        //     coordinateSystem: 'geo',
        //     emphasis: {
        //         itemStyle: {
        //             shadowBlur: 10,
        //             shadowColor: 'rgba(0, 0, 0, 0.5)',
        //         },
        //     },
        //     itemStyle: {
        //         borderWidth: 1,
        //         borderColor: '#fff',
        //     },
        //     data: [],
        //     // this.heatmapConverData([
        //     // [113.653412, 43.854108, 10000],
        //     // { name: '北京市', value: 3000 },
        //     // { name: '上海市', value: 5000 },
        //     // { name: '安徽省', value: 7000 },
        //     // { name: '西藏自治区', value: 10000 },
        //     // { name: '海南省', value: 1000 },
        //     // { name: '青海省', value: 90 },
        //     // ]),
        // },
    ],
    tooltip: {
        show: false,
        // trigger: 'item',
        // backgroundColor: 'white',
        // formatter: ``,
    },
};
