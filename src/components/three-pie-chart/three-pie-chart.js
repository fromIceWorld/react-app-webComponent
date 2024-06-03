import React from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { THREE_PIE_CHART_CONFIG } from './three-pie-chart-config.js';
import { transformValue } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(THREE_PIE_CHART_CONFIG)
class ThreePieChart extends React.Component {
    static tagNamePrefix = 'three-pie-chart';
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            data: [],
            title: '',
            isSelected: false,
            isHovered: false,
            hoveredIndex: '',
            startRatio: '',
            endRatio: '',
            k: 1 / 12,
        };
    }
    chart;
    option;
    // colors = ['#56b2ff', '#1079d9', '#7ee0d3', '#f0cf45', '#3497f1', '#2c74de'];
    colors = ['#5282ca', '#3c98e7', '#76bcf7', '#86ecef', '#fcda4a'];
    // 修改chart 数据
    applyData(data) {
        let option = (this.option = this.getPie3D(data, 0.59));
        if (this.chart) {
            this.chart.clear();
        }
        this.chart = echarts.init(this.refs.threePieChart);
        this.chart.setOption({ ...option });
    }
    componentDidMount() {
        this.initChartConfig();

        this.initChart();
        this.resizeObserver();
    }
    initChartConfig() {
        const container = this.props.container;
        if (container) {
            container.that = this;
        }
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(
            () => requestIdleCallback(this.chart.resize)
            // this.chart.resize()
        );
        chartObserver.observe(this.refs.threePieChart);
    }
    initChart() {
        this.applyData([
            {
                name: 'cc',
                value: 100,
            },
            {
                name: 'aa',
                value: 60,
            },
            {
                name: 'bb',
                value: 40,
            },
            {
                name: 'ee',
                value: 30,
            },
            {
                name: 'dd',
                value: 23,
            },
        ]);

        this.hoverEvent();
    }
    render() {
        return (
            <div
                className="three-pie-chart"
                ref="threePieChart"
                style={{ width: this.state.width, height: this.state.height }}
            ></div>
        );
    }
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = 1 / 12;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = 0;
        let offsetY = 0;
        let offsetH = isSelected || isHovered ? 50 : 8;
        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32,
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },

            x: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetX +
                        Math.cos(startRadian) *
                            (1 + Math.cos(v) * k) *
                            hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetX +
                        Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return (
                    offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
                );
            },

            y: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetY +
                        Math.sin(startRadian) *
                            (1 + Math.cos(v) * k) *
                            hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetY +
                        Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return (
                    offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
                );
            },

            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * offsetH * 0.08;
                }
                return Math.sin(v) > 0 ? 1 * offsetH * 0.08 : -1;
            },
        };
    }
    getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k = 1 / 5;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
            sumValue += pieData[i].value;

            let seriesItem = {
                name:
                    typeof pieData[i].name === 'undefined'
                        ? `series${i}`
                        : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false,
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: k,
                },
            };
            seriesItem.itemStyle = {};
            seriesItem.itemStyle.color = this.colors[i % this.colors.length];
            // if (typeof pieData[i].itemStyle != 'undefined') {
            //     let itemStyle = {};
            //     if (typeof pieData[i].itemStyle.color != 'undefined') {
            //         itemStyle.color = this.colors[i % this.colors.length];
            //     }
            //     if (typeof pieData[i].itemStyle.opacity != 'undefined') {
            //         itemStyle.opacity = pieData[i].itemStyle.opacity;
            //     }

            //     seriesItem.itemStyle = itemStyle;
            // }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value;

            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = this.getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                series[i].pieData.value
            );

            startValue = endValue;

            legendData.push(series[i].name);
        }

        // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        series.push({
            name: 'mouseoutSeries',
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            itemStyle: {
                opacity: 0,
            },
            parametricEquation: {
                u: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    return Math.sin(v) * Math.sin(u) + Math.sin(u);
                },
                y: function (u, v) {
                    return Math.sin(v) * Math.cos(u) + Math.cos(u);
                },
                z: function (u, v) {
                    return Math.cos(v) > 0 ? 0.1 : -0.1;
                },
            },
        });

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
            title: {
                text: '',
                top: '48%',
                textAlign: 'center',
                left: '50%',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                },
                top: '10%',
                subtext: '1',
                subtextStyle: {
                    color: '#f0cf46',
                    fontSize: 22,
                    lineHeight: 150,
                },
            },
            // //animation: false,
            // legend: {
            //     data: legendData,
            // },
            tooltip: {
                show: false,
            },
            xAxis3D: {
                min: -1,
                max: 1,
            },
            yAxis3D: {
                min: -1,
                max: 1,
            },
            zAxis3D: {
                min: -1,
                max: 1,
            },
            grid3D: {
                show: false,
                boxHeight: 10,
                viewControl: {
                    distance: 160,
                    alpha: 30,
                    beta: 230,
                },
                //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
                postEffect: {
                    //配置这项会出现锯齿，请自己去查看官方配置有办法解决
                    enable: true,
                    bloom: {
                        enable: true,
                        bloomIntensity: 0.5,
                    },
                    FXAA: {
                        enable: true,
                    },
                    SSAO: {
                        enable: true,
                        quality: 'medium',
                        radius: 30,
                        zoomSensitivity: 10,
                    },
                },
            },
            series: series,
        };
        return option;
    }
    hoverEvent() {
        this.chart.on('click', (params) => {
            console.log('mouseover');
            // 优化3d图在低资源环境下的卡顿

            // 如果触发 mouseover 的扇形当前已高亮，则不做操作
            if (this.state.hoveredIndex === params.seriesIndex) {
                return;
                // 否则进行高亮及必要的取消高亮操作
            } else {
                // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
                if (this.state.hoveredIndex !== '') {
                    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                    this.state.isSelected =
                        this.option.series[
                            this.state.hoveredIndex
                        ].pieStatus.selected;
                    this.state.isHovered = false;
                    this.state.startRatio =
                        this.option.series[
                            this.state.hoveredIndex
                        ].pieData.startRatio;
                    this.state.endRatio =
                        this.option.series[
                            this.state.hoveredIndex
                        ].pieData.endRatio;
                    this.state.k =
                        this.option.series[this.state.hoveredIndex].pieStatus.k;

                    // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                    this.option.series[
                        this.state.hoveredIndex
                    ].parametricEquation = this.getParametricEquation(
                        this.state.startRatio,
                        this.state.endRatio,
                        this.state.isSelected,
                        this.state.isHovered,
                        this.state.k,
                        this.option.series[this.state.hoveredIndex].pieData
                            .value,
                        this.state.hoveredIndex
                    );
                    this.option.series[
                        this.state.hoveredIndex
                    ].pieStatus.hovered = this.state.isHovered;

                    // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                    this.state.hoveredIndex = '';
                }

                // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
                if (params.seriesName !== 'mouseoutSeries') {
                    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                    this.state.isSelected =
                        this.option.series[
                            params.seriesIndex
                        ].pieStatus.selected;
                    this.state.isHovered = true;
                    this.state.startRatio =
                        this.option.series[
                            params.seriesIndex
                        ].pieData.startRatio;
                    this.state.endRatio =
                        this.option.series[params.seriesIndex].pieData.endRatio;
                    this.state.k =
                        this.option.series[params.seriesIndex].pieStatus.k;

                    // 对当前点击的扇形，执行高亮操作（对 option 更新）
                    this.option.series[params.seriesIndex].parametricEquation =
                        this.getParametricEquation(
                            this.state.startRatio,
                            this.state.endRatio,
                            this.state.isSelected,
                            this.state.isHovered,
                            this.state.k,
                            this.option.series[params.seriesIndex].pieData
                                .value + 5
                        );
                    this.option.series[params.seriesIndex].pieStatus.hovered =
                        this.state.isHovered;

                    // 记录上次高亮的扇形对应的系列号 seriesIndex
                    this.state.hoveredIndex = params.seriesIndex;
                    this.option.title.text = params.seriesName;
                    this.option.title.subtext =
                        this.option.series[params.seriesIndex].pieData.value;
                }

                // 使用更新后的 option，渲染图表
                this.chart.setOption(this.option);
            }
        });
    }

    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${ThreePieChart.tagNamePrefix}-${index}`;
        const { html: config } = option;
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class ThreePieChart${index} extends ThreePieChartComponent{
                    that;
                    constructor(){
                        super();
                    }
                    set data(value){
                        this.that.applyData(value || []);
                    } 
                };
                customElements.define('${tagName}',ThreePieChart${index});
                `,
        };
    }
}

export { ThreePieChart };
