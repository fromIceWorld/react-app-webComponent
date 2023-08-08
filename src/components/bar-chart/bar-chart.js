import React from 'react';
import * as echarts from 'echarts';
import { config } from '../../decorators/config.js';
import { BAR_CHART_CONFIG } from './bar-chart-config.js';
import { transformValue } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(BAR_CHART_CONFIG)
class BarChart extends React.Component {
    static tagNamePrefix = 'bar-chart';
    constructor(props) {
        super(props);
        this.state = {};
    }
    xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    series = [
        {
            type: 'bar',
            name: '石家庄',
            data: [193, 234, 310, 1215, 1341, 3818, 400],
        },
        {
            type: 'bar',
            name: '北京',
            data: [193, 234, 310, 1215, 1341, 4681, 400],
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
        legend: {
            data: this.series.map((item) => item.name),
            left: 'right',
        },
        xAxis: {
            type: 'category',
            data: this.xData,
        },
        yAxis: {
            type: 'value',
        },
        grid: [{ left: 50, right: 10, top: 50, bottom: 30 }],
        series: this.series,
    };
    // 修改chart 数据
    applyData(config) {
        const option = this.chart.getOption();
        const { title, xData, series, color } = config;
        // 应用chart 数据
        option.title[0].text = title || '';
        option.xAxis = {
            data: xData || [],
        };
        option.series = series || [];
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
        const { title, color, xData, series } = config;
        this.option.title.text = title;
        this.option.color = color;
        this.option.xAxis.data = xData;
        this.option.series = series;
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
