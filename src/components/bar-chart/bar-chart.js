import React from 'react';
import * as echarts from 'echarts';
import { config } from '../../decorators/config.js';
import { BAR_CHART_CONFIG } from './bar-chart-config.js';
import { transform, assign } from '../../common/index.js';
window['echarts'] = echarts;
window['React.Component'] = React.Component;
@config(BAR_CHART_CONFIG)
class BarChart extends React.Component {
    static tagNamePrefix = 'bar-chart';
    constructor(props) {
        super(props);
        console.log(props);
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
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
        },
        yAxis: {
            type: 'value',
            value: [],
        },
        series: [
            {
                name: '2011',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230],
            },
            {
                name: '2012',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807],
            },
        ],
    };
    // 只修改数据
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
    componentWillReveiceProps(nextProps) {
        console.log(nextProps);
    }
    componentDidUpdate(nextProps) {
        console.log(nextProps);
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
    set options(value) {
        console.log(value);
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(() => this.chart.resize());
        chartObserver.observe(this.refs.barChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.barChart);
        chart.setOption(this.option);
        this.chart = chart;
    }
    render() {
        return (
            <div
                type={this.props.name}
                className="bar-chart"
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${BarChart.tagNamePrefix}-${index}`;
        const { html } = option;
        let jsonString = html[0].config.list.value,
            customCode = html[1].config.code.value.trim();
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class BarChart${index} extends BarChartComponent{
                    constructor(props){
                        super(props);
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
                };
                customElements.define('${tagName}',BarChart${index});
                `,
        };
    }
}
export { BarChart };
