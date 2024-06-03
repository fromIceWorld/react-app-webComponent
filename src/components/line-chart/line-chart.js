import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { LINE_CHART_CONFIG } from './line-chart-config.js';
import { transform, assign } from '../../common/index.js';

window['React.Component'] = React.Component;
window['echarts'] = echarts;
@config(LINE_CHART_CONFIG)
class LineChart extends React.Component {
    static tagNamePrefix = 'line-chart';
    constructor(props) {
        super(props);
        this.state = {};
    }
    chart;
    option = {
        title: {
            show: false,
            text: 'title',
            link: '',
            left: '10px',
            top: '10px',
            right: 'auto',
            bottom: 'auto',
        },
        color: [
            '#f48282',
            '#f8de83',
            '#9dc9ff',
            '#a2d5ea',
            '#b8c5dd',
            '#5c81b1',
            '#f7c0c0',
            '#b4d0e8',
            '#f1a26e',
        ],
        tooltip: {
            show: true,
            orient: 'vertical',
            left: 'auto',
            right: '10px',
            top: 'center',
            bottom: 'auto',
            align: 'right',
            trigger: 'axis',
            data: [],
        },
        legend: {
            show: true,
            orient: 'vertical',
            left: 'auto',
            right: '10px',
            top: 'center',
            bottom: 'auto',
            align: 'right',
            data: [
                'Email',
                'Union Ads',
                'Video Ads',
                'Direct',
                'Search Engine',
            ],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true,
        }, //边距
        xAxis: {
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            show: true,
            type: 'value',
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                showSymbol: false,
                smooth: true,
                areaStyle: {},

                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: 'Union Ads',
                type: 'line',
                smooth: true,
                lineStyle: {
                    type: 'solid',
                },
                stack: 'Total',
                showSymbol: false,

                data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
                name: 'Video Ads',
                type: 'line',
                smooth: true,
                showSymbol: false,

                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
                name: 'Direct',
                type: 'line',
                smooth: true,
                showSymbol: false,

                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                smooth: true,
                showSymbol: false,

                showSymbol: false,
                smooth: true,
                data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
        ],
    };
    // 只修改数据
    /**
     *
     * @param {x} data = {
     *   x:[1,2,3,4],
     *   y:[[1,2,3,4], [5,6,7,8]]
     * }
     *
     */
    applyData(data) {
        const { x, y } = data;
        let options = this.chart.getOption();
        options.xAxis[0].data = x;
        options.series.splice(y.length);
        options.series.forEach((item, index) => {
            item.data = y[index];
        });
        this.chart.setOption(options, {
            notMerge: true,
        });
    }
    // 替换整个options
    applyOptions(option) {
        this.chart.setOption(option, {
            notMerge: true,
        });
    }

    componentDidMount() {
        this.initChartConfig();
        // 组件自有逻辑
        this.initChart();
        this.resizeObserver();
        this.apply();
    }
    apply() {
        const container = this.props.container;
        // 从 input 读取数据
        const { data, options } = container.input || {};
        if (data) {
            console.log(this, this.that, data, container);
            if (container) {
                this.applyData(data);
            } else {
                this.data = data;
            }
        } else if (options) {
            if (this.that) {
                this.applyOptions(options);
            } else {
                this.options = options;
            }
        }
    }
    initChartConfig() {
        const container = this.props.container;
        if (container) {
            if (
                container.customCode &&
                Object.keys(container.customCode).length
            ) {
                this.option = container.customCode;
            } else if (
                container.preOption &&
                Object.keys(container.preOption).length
            ) {
                this.option = container.preOption;
            }
            container.that = this;
        }
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(() => this.chart.resize());
        chartObserver.observe(this.refs.lineChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.lineChart);
        chart.setOption(this.option);
        this.chart = chart;
    }
    render() {
        return (
            <div
                className="line-chart"
                ref="lineChart"
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${LineChart.tagNamePrefix}-${index}`;
        const { html } = option;
        let jsonString = html[0].config.list.value,
            customCode = html[1].config.code.value.trim();
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class LineChart${index} extends LineChartComponent{
                    constructor(){
                        super();
                    }
                    static get observedAttributes() {
                        return ['input'];
                    }
                    input
                    attributeChangedCallback(name, oldValue, newValue) {
                        if(name == 'input'){
                            this.input = JSON.parse(newValue);
                            if(this.that){
                                this.that.apply()
                            }
                            
                        }
                    }
                    get preOption(){
                        let option = {};
                        ((echarts) => {${jsonString}})(echarts);
                        return option;
                    }
                    get customCode(){
                        let option = {};
                        ((echarts) => {${customCode}})(echarts);
                        return option;
                    }
                    get option(){
                        return this.that.chart.getOption()
                    }
                    set option(value){
                        this.that.chart.setOption(value || {});
                    }
                    set data(value){
                        this.that.applyData(value)
                    }   
                };
                customElements.define('${tagName}',LineChart${index});
                `,
        };
    }
}

export { LineChart };
