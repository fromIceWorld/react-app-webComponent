import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { LINE_CHART_CONFIG } from './line-chart-config.js';
import { transformValue } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(LINE_CHART_CONFIG)
class LineChart extends React.Component {
    static tagNamePrefix = 'line-chart';
    constructor(props) {
        super(props);
        this.state = {};
    }
    xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    series = [
        {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 0],
        },
        {
            name: '销量2',
            type: 'line',
            data: [15, 30, 46, 20, 20, 30, 0],
        },
    ];
    chart;
    option = {
        title: {
            text: 'demo组件',
        },
        color: [
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de',
            '#3ba272',
            '#fc8452',
            '#9a60b4',
            '#ea7ccc',
        ],
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            show: true,
            data: this.series.map((item) => item.name),
            left: 'right',
            top: 'top',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true,
        }, //边距
        xAxis: {
            data: this.xData,
        },
        yAxis: {},
        series: this.series,
    };
    // 修改chart 数据
    applyData(config) {
        const option = this.chart.getOption();
        const { title, xData, series, color, grid } = config;
        // 应用chart 数据
        option.title[0].text = title || '';
        option.xAxis = {
            data: xData || [],
        };
        option.series = series || [];
        option.color = color || [];
        option.grid = Object.assign(option.grid, grid);
        this.chart.setOption(option);
    }
    componentDidMount() {
        // 应用web component自定义的数据
        this.beforeWebComponentInit();
        // 组件自有逻辑
        this.initChart();
        this.resizeObserver();
        // web component组件初始化数据后,其他组件事件才可以获取到当前组件内容
        this.afterWebComponentInit();
    }
    // 初始化echarts 之前，将 web component 配置项应用到组件上
    beforeWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.option) {
            return;
        }
        container.that = this;
        // 使用用户自定义配置项合并chart配置项
        this.initChartConfig(container.option);
    }
    // web components 构造子组件
    afterWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.option) {
            return;
        }
        this.initCompleted();
    }
    initChartConfig(config) {
        const { title, color, xData, series, grid, legend, xAxis, yAxis } =
            config;
        this.option.color = color;
        this.option.xAxis.data = xData;
        this.option.series = series;
        this.option.grid = Object.assign(this.option.grid, grid);
        this.option.legend = Object.assign(this.option.legend, legend);
        this.option.title = Object.assign(this.option.title, title);
        this.option.xAxis = Object.assign(this.option.xAxis, xAxis);
        this.option.yAxis = Object.assign(this.option.yAxis, yAxis);
    }
    initCompleted(detail) {
        const container = this.props.container;
        let customEvent = new CustomEvent('initCompleted', {
            detail,
        });
        container.dispatchEvent(customEvent);
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(() => this.chart.resize());
        chartObserver.observe(this.refs.lineChart);
    }
    initChart() {
        this.chart = echarts.init(this.refs.lineChart);
        this.chart.setOption(this.option);
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
        const config = `{
            ${Object.keys(html[0].config)
                .map((key) => {
                    return `${key} : ${transformValue(html[0].config[key])},`;
                })
                .join('\n')}
              title:{
                ${Object.keys(html[1].config)
                    .map((key) => {
                        return `${key} : ${transformValue(
                            html[1].config[key]
                        )},`;
                    })
                    .join('\n')}
              },
              grid:{
                ${Object.keys(html[2].config)
                    .map((key) => {
                        return `${key} : ${transformValue(
                            html[2].config[key]
                        )},`;
                    })
                    .join('\n')}
              },
              legend:{
                ${Object.keys(html[3].config)
                    .map((key) => {
                        return `${key} : ${transformValue(
                            html[3].config[key]
                        )},`;
                    })
                    .join('\n')}
              },  
              xAxis:{
                ${Object.keys(html[4].config)
                    .map((key) => {
                        return `${key} : ${transformValue(
                            html[4].config[key]
                        )},`;
                    })
                    .join('\n')}
              },  
              yAxis:{
                ${Object.keys(html[5].config)
                    .map((key) => {
                        return `${key} : ${transformValue(
                            html[5].config[key]
                        )},`;
                    })
                    .join('\n')}
              },  
        }`;
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class LineChart${index} extends LineChartComponent{
                    that;
                    constructor(){
                        super();
                    }
                    get option(){
                        return ${config}
                    }
                    get config(){
                       return this.that.option
                    }
                    set config(value){
                        console.log('value',value)
                        const {title,xData,series,grid} = value || {};
                        this.that.applyData({title,xData,series,grid});
                    }   
                };
                customElements.define('${tagName}',LineChart${index});
                `,
        };
    }
}

export { LineChart };
