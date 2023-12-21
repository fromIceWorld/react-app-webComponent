import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { LINE_CHART_CONFIG } from './line-chart-config.js';
import { transform, assign } from '../../common/index.js';

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
    ];
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
        series: this.series,
    };
    // 修改chart 数据
    applyData(config) {
        const option = this.chart.getOption();
        this.chart.setOption(assign(option, config));
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
        this.option = assign(this.option, config);
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
        const config = JSON.stringify(
            html.reduce((pre, cur) => {
                return {
                    ...pre,
                    ...transform(cur.config),
                };
            }, {})
        );
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
