import React from 'react';
import * as echarts from 'echarts';
import { config } from '../../decorators/config.js';
import { CHINA_MAP_CONFIG } from './china-map-config.js';
import { transform, assign } from '../../common/index.js';
import PropTypes from 'prop-types';

const mapJSON = require('../../assets/json/china.json');
@config(CHINA_MAP_CONFIG)
class ChinaMapChart extends React.Component {
    static tagNamePrefix = 'china-map-chart';
    chart;
    carousel = false; // 开启轮播
    roadmap = false; // 路线图
    heatmap = false; // 热力图
    // echart 的option 配置
    option = {
        backgroundColor: '#001938',
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
            // {
            //     name: 'circle',
            //     type: 'effectScatter',
            //     coordinateSystem: 'geo',
            //     data: this.effectScatterConvertData([
            //         { name: '北京市', value: 440 },
            //         { name: '江苏省', value: 44 },
            //         { name: '浙江省', value: 44 },
            //         { name: '辽宁省', value: 44 },
            //         { name: '海南省', value: 44 },
            //         { name: '新疆维吾尔自治区', value: 44 },
            //         {
            //             name: '苏尼特左旗',
            //             value: [113.653412, 43.854108, 4500],
            //         },
            //     ]),
            //     symbolSize: 10,
            //     showEffectOn: 'render',
            //     rippleEffect: {
            //         brushType: 'stroke',
            //     },
            //     hoverAnimation: true,
            //     label: {
            //         normal: {
            //             formatter: '{b}',
            //             position: 'right',
            //             show: true,
            //         },
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#98e574',
            //             shadowBlur: 45,
            //             shadowColor: '#0a99ff',
            //             shadowOffsetY: 10,
            //         },
            //     },
            //     zlevel: 1,
            // },
            // {
            //     type: 'lines',
            //     zlevel: 50,
            //     effect: {
            //         show: true,
            //         period: 8,
            //         trailLength: 0.01,
            //         symbol: 'arrow',
            //         symbolSize: 5,
            //     },
            //     lineStyle: {
            //         normal: {
            //             curveness: 0.5,
            //             width: 1,
            //             opacity: 1,
            //         },
            //     },
            //     data: this.lineConvertData([
            //         [{ name: '北京市' }, { name: '江苏省' }, { value: 0 }],
            //         [{ name: '浙江省' }, { name: '辽宁省' }, { value: 0 }],
            //         [{ name: '辽宁省' }, { name: '海南省' }, { value: 0 }],
            //         [
            //             {
            //                 name: '苏尼特左旗',
            //                 coord: [113.653412, 43.854108],
            //             },
            //             { name: '海南省' },
            //             { value: 0 },
            //         ],
            //         [
            //             {
            //                 name: '新疆维吾尔自治区',
            //             },
            //             { name: '海南省' },
            //             { value: 0 },
            //         ],
            //         [
            //             { name: '海南省' },
            //             {
            //                 name: '新疆维吾尔自治区',
            //             },
            //             { value: 0 },
            //         ],
            //     ]),
            // },
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
            //     data: this.heatmapConverData([
            //         [113.653412, 43.854108, 10000],
            //         { name: '北京市', value: 3000 },
            //         { name: '上海市', value: 5000 },
            //         { name: '安徽省', value: 7000 },
            //         { name: '西藏自治区', value: 10000 },
            //         { name: '海南省', value: 1000 },
            //         { name: '青海省', value: 90 },
            //     ]),
            // },
        ],
        tooltip: {
            show: false,
            // trigger: 'item',
            // backgroundColor: 'white',
            // formatter: ``,
        },
    };
    set linesData(list) {
        this.setData('lines', list);
    }
    set effectScattereData(list) {
        this.setData('effectScatter', list);
    }
    set heatmapData(list) {
        this.setData('heatmap', list);
    }
    // 清除涟漪点数据
    clearEffectScatter() {
        this.clearData('effectScatter');
    }
    // 清除连线数据
    clearLines() {
        this.clearData('lines');
    }
    // 清除热力图数据
    clearHeatmap() {
        this.clearData('heatmap');
    }
    clearAllData() {
        this.clearEffectScatter();
        this.clearLines();
        this.clearHeatmap();
    }
    setData(type, list) {
        let option = this.chart.getOption(),
            series = option.series,
            serie = series.filter((item) => item.type == type)[0];
        let data = [];
        switch (type) {
            case 'heatmap':
                data = this.heatmapConverData(list);
                break;
            case 'lines':
                data = this.lineConvertData(list);
                break;
            case 'effectScatter':
                data = this.effectScatterConvertData(list);
                break;
        }
        serie.data = data;
        this.chart.setOption(option);
    }
    clearData(type) {
        let option = this.chart.getOption(),
            series = option.series,
            serie = series.filter((item) => item.type == type)[0];
        serie.data = [];
        this.chart.setOption(option);
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 涟漪点 数据
    effectScatterConvertData(data) {
        let res = [];
        const { features } = mapJSON;
        data.forEach((node) => {
            const { name: targetName, value } = node;
            // 有名称和经纬度和值的
            if (targetName && value && value.length >= 3) {
                res.push({
                    name: targetName,
                    value,
                });
                return;
            }
            // 有名称 无经纬度的
            features.forEach((item) => {
                const { properties } = item,
                    { name, centroid } = properties;
                if (name == targetName) {
                    res.push({
                        name,
                        value: [...centroid, value],
                    });
                    return;
                }
            });
        });
        return res;
    }
    // 线 数据
    lineConvertData(data) {
        const res = [];
        const { features } = mapJSON;
        for (let i = 0; i < data.length; i++) {
            // 线：[来源,去向,线详情]
            const [from, to, value] = data[i];
            let fromCoord = from.coord,
                toCoord = to.coord;
            if (fromCoord && toCoord) {
                res.push([
                    {
                        coord: fromCoord,
                    },
                    {
                        coord: toCoord,
                    },
                    {
                        value,
                    },
                ]);
                return;
            }
            features.forEach((item) => {
                const { properties } = item,
                    { name, centroid } = properties;
                fromCoord =
                    !fromCoord && name == from.name ? centroid : fromCoord;
                toCoord = !toCoord && name == to.name ? centroid : toCoord;
                if (fromCoord && toCoord) {
                    res.push([
                        {
                            coord: fromCoord,
                        },
                        {
                            coord: toCoord,
                        },
                        {
                            value,
                        },
                    ]);
                    return;
                }
            });
        }
        return res;
    }
    /**
     *
     * @param {*} data [number,number,number]
     * @returns
     */
    // 支持：
    //  1. 直接经纬度             [number,number,number]
    //  2. 传入 name 和 value     {name:'',value:0}
    heatmapConverData(data) {
        let res = [];
        const { features } = mapJSON;
        data.forEach((params) => {
            if (Array.isArray(params) && params.length == 3) {
                res.push(params);
            } else {
                const { name: targetName, value } = params;
                // 有名称 无经纬度的
                features.forEach((item) => {
                    const { properties } = item,
                        { name, centroid } = properties;
                    if (name == targetName) {
                        res.push([...centroid, value]);
                        return;
                    }
                });
            }
        });
        return res;
    }
    initChartConfig(config) {
        const { title } = config;
        this.option.title.text = title;
    }
    // 修改chart 数据
    applyData(config) {
        this.chart.setOption(config, {
            notMerge: true,
        });
    }
    componentDidMount() {
        // 应用web component自定义的数据
        this.beforeWebComponentInit();
        // 组件自有逻辑
        this.initChart();
        this.addEvent();
        this.resizeObserver();
        // web component组件初始化数据后,其他组件事件才可以获取到当前组件内容
        this.afterWebComponentInit();
    }
    // web components 构造子组件
    afterWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.config) {
            return;
        }
        this.initCompleted();
    }
    // 初始化echarts 之前，将 web component 配置项应用到组件上
    beforeWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.config) {
            return;
        }
        container.that = this;
        // 使用用户自定义配置项合并chart配置项
        this.initChartConfig(container.config);
    }
    // 监听容器width，height
    resizeObserver() {
        let resizeTimeout;
        const chartObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.chart.resize();
            }, 500);
        });
        chartObserver.observe(this.refs.chinaChart);
    }
    initChart() {
        echarts.registerMap('500000', {
            geoJSON: require('../../assets/json/china.json'),
        });
        this.chart = echarts.init(this.refs.chinaChart);
        this.chart.setOption(this.option);
        window.addEventListener('resize', () => this.chart.resize());
        // 启动轮播
        this.beginCarousel();
    }
    addEvent() {
        this.chart.on('click', (e) => {
            const { componentSubType } = e;
            if (componentSubType == 'map') {
                console.log('地区', e);
            } else if (componentSubType == 'scatter') {
                console.log('散点', e);
            }
            console.log(e);
        });
    }
    initCompleted(detail) {
        const container = this.props.container;
        let customEvent = new CustomEvent('initCompleted', {
            detail,
        });
        container.dispatchEvent(customEvent);
    }
    // 轮播
    beginCarousel() {
        if (!this.carousel) {
            return;
        }
        console.log('轮播', this.chart);
        const option = this.chart.getOption();
        const data = option.series.filter(
            (item) => item.type == 'effectScatter'
        )[0].data;
        let index = 0;
        setInterval(() => {
            this.chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1, // 涟漪
                dataIndex: index,
            });
            index++;
            index %= data.length;
        }, 3000);
    }
    render() {
        return (
            <div
                className="china-chart"
                ref="chinaChart"
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${ChinaMapChart.tagNamePrefix}-${index}`;
        const { html } = option;
        const config = JSON.stringify(transform(html[0].config));
        return {
            tagName: tagName,
            html: `<${tagName} _methods="that"></${tagName}>`,
            js: `class ChinaMapChart${index} extends ChinaMapChartComponent{
                    constructor(){
                        super();
                    }
                    get config(){
                        return ${config}
                    }
                    get option(){
                        return this.that.chart.getOption();
                    }
                    set option(value){
                        this.that.applyData( value || {});
                    }   
                };
                customElements.define('${tagName}',ChinaMapChart${index});
                `,
        };
    }
}
export { ChinaMapChart };
