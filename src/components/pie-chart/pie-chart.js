import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { PIE_CHART_CONFIG } from './pie-chart-config.js';
import { transform, assign } from '../../common/index.js';

window['React.Component'] = React.Component;
window['echarts'] = echarts;

@config(PIE_CHART_CONFIG)
class PieChart extends React.Component {
    static tagNamePrefix = 'pie-chart';
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
            show: false,
            trigger: 'item',
        },
        legend: {
            show: false,
            orient: 'vertical',
            left: 'auto',
            right: '10px',
            top: 'center',
            bottom: 'auto',
            align: 'right',
        },
        series: [
            {
                type: 'pie',
                radius: ['47%', '60%'],
                labelLine: {
                    show: false,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    disabled: false,
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: '{x1|{c}}\n{x2|{b}}',
                        rich: {
                            x1: {
                                color: '#7b7b7b',
                                lineHeight: 20,
                                fontSize: 20,
                            },
                            x2: {
                                color: '#4d4d4d',
                                height: 30,
                                fontSize: 25,
                            },
                        },
                    },
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                ],
            },
        ],
    };
    /**
     * 
     * @param {*} data
     * 
     * [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ] 
     */
    // 只修改数据
    applyData(data) {
        let options = this.chart.getOption();
        options.series[0].data = data;
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
    // 挂载到页面，才能获取真实dom
    componentDidMount() {
        this.initChartConfig();
        // 组件自有逻辑
        this.initChart();
        this.resizeObserver();
        // web component组件初始化数据后,其他组件事件才可以获取到当前组件内容
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
        chartObserver.observe(this.refs.pieChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.pieChart);
        chart.setOption(this.option);
        this.chart = chart;
    }
    render() {
        return (
            <div
                className="pie-chart"
                ref="pieChart"
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${PieChart.tagNamePrefix}-${index}`;
        const { html } = option;
        let jsonString = html[0].config.list.value,
            customCode = html[1].config.code.value.trim();
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class PieChart${index} extends PieChartComponent{
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
                        ((echarts) => {${String.raw`${jsonString}`}})(echarts);
                        return option;
                    }
                    get customCode(){
                        let option = {};
                        ((echarts) => {${String.raw`${customCode}`}})(echarts);
                        return option;
                    }
                    get option(){
                        return this.that.chart.getOption()
                    }
                    set option(value){
                        this.that.chart.setOption(value || {});
                    } 
                    set data(value){
                        this.that.applyData(value || {});
                    }
                };
                customElements.define('${tagName}',PieChart${index});
                `,
        };
    }
}
export { PieChart };
