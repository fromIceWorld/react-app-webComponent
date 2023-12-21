import React from 'react';
import * as echarts from 'echarts';
import { config } from '../../decorators/config.js';
import { BAR_CHART_CONFIG } from './bar-chart-config.js';
import { transform, assign } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(BAR_CHART_CONFIG)
class BarChart extends React.Component {
    static tagNamePrefix = 'bar-chart';
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
            type: 'value',
            data: [],
        },
        yAxis: {
            type: 'category',
            value: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
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
                className="bar-chart"
                ref="barChart"
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${BarChart.tagNamePrefix}-${index}`;
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
            js: `class BarChart${index} extends BarChartComponent{
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
                        const {title, xData, series, width, height} = value || {};
                        this.that.applyData({title, xData, series, width, height});
                    }   
                };
                customElements.define('${tagName}',BarChart${index});
                `,
        };
    }
    // static propTypes = {
    //     name: PropTypes.string.isRequired,
    // };
}
export { BarChart };
