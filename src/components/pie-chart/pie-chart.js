import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { PIE_CHART_CONFIG } from './pie-chart-config.js';
import { transformValue } from '../../common/index.js';

window['React.Component'] = React.Component;
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
            text: 'demo组件',
            left: 'center',
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
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    // 修改chart 数据
    applyData(config) {
        const option = this.chart.getOption();
        const { title, data, color } = config;
        // 应用chart 数据
        option.title[0].text = title || option.title[0].text;
        option.series[0].data = data || [];
        option.color = color || [];
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
        const { title, color, data } = config;
        this.option.title.text = title;
        this.option.color = color;
        this.option.series[0].data = data || [];
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
        const config =
            '{' +
            Object.keys(html)
                .map((key) => {
                    return `${key} : ${transformValue(html[key])},`;
                })
                .join('\n') +
            '}';
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class PieChart${index} extends PieChartComponent{
                    that;
                    constructor(){
                        super();
                    }
                    get option(){
                        return ${config}
                    }
                    get config(){
                        return this.that.option;
                    }
                    set config(value){
                        console.log('value',value)
                        const {title,data} = value || {};
                        this.that.applyData({title,data});
                    }   
                };
                customElements.define('${tagName}',PieChart${index});
                `,
        };
    }
}
PieChart.propTypes = {
    name: PropTypes.string.isRequired,
};
export { PieChart };
