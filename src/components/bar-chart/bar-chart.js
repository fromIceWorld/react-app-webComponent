import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { BAR_CHART_CONFIG } from './bar-chart-config.js';
import { transformValue } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(BAR_CHART_CONFIG)
class BarChart extends React.Component {
    static tagNamePrefix = 'bar-chart';
    constructor(props) {
        super(props);
        this.state = {
            width: '400px',
            height: '200px',
            title: '',
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                { type: 'bar', data: [193, 234, 310, 1215, 1341, 3818, 400] },
                { type: 'bar', data: [193, 234, 310, 1215, 1341, 4681, 400] },
            ],
        };
    }
    chart;
    get height() {
        return this.heights[0];
    }
    set height(value) {
        this.heights.push(value);
    }
    // 修改chart 数据
    applyData(config) {
        const option = this.chart.getOption();
        console.log(option);
        const { title, xData, series, width, height } = config;
        this.setState({
            width: width || '100%',
            height: height || this.state.height,
        });
        // 应用chart 数据
        option.title[0].text = title || '';
        option.xAxis = {
            data: xData || [],
        };
        option.series = series || [];
        this.chart.setOption(option);
    }
    componentDidMount() {
        this.initChart();
        this.resizeObserver();
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(() => this.chart.resize());
        chartObserver.observe(this.refs.lineChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.lineChart);
        chart.setOption({
            title: {
                text: this.state.title,
            },
            legend: {},
            xAxis: {
                type: 'category',
                data: this.state.xData,
            },
            yAxis: {
                type: 'value',
            },
            grid: [{ left: 50, right: 10, top: 50, bottom: 30 }],
            series: this.state.series,
        });
        this.chart = chart;
    }
    render() {
        return (
            <div
                className="bar-chart"
                ref="lineChart"
                style={{ width: this.state.width, height: this.state.height }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${BarChart.tagNamePrefix}-${index}`;
        const { html: config } = option;
        console.log('option', option);
        const init =
            'applyData({' +
            Object.keys(config)
                .map((key) => {
                    return `${key} : ${transformValue(config[key])},`;
                })
                .join('\n') +
            '})';
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class BarChart${index} extends BarChartComponent{
                    that;
                    constructor(){
                        super();
                        setTimeout(()=>{
                            let index = Object.keys(this).filter(key=>key.startsWith('__reactContainer'));
                            let ins = this.that = this[index[0]].child.stateNode;
                            ins.${init}
                        },300);
                    }
                    get config(){
                        console.log('config');
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
