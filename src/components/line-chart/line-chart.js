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
        this.state = {
            width: '400px',
            height: '200px',
            title: '',
            xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
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
        option.legend[0].data = series.map((item) => item.name || '');
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
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: this.state.series.map((item) => item.name),
                left: 'right',
            },
            grid: [
                {
                    x: 40,
                    y: 50,
                    x2: 30,
                    y2: 40,
                },
            ],
            xAxis: {
                data: this.state.xData,
            },
            yAxis: {},
            series: this.state.series,
        });
        this.chart = chart;
    }
    render() {
        return (
            <div
                className="line-chart"
                ref="lineChart"
                style={{ width: this.state.width, height: this.state.height }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${LineChart.tagNamePrefix}-${index}`;
        const { html: config, css, className } = option;
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
            js: `class LineChart${index} extends LineChartComponent{
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
                        const {title,xData,series} = value || {};
                        this.that.applyData({title,xData,series});
                    }   
                };
                customElements.define('${tagName}',LineChart${index});
                `,
        };
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
    };
}
LineChart.propTypes = {
    name: PropTypes.string.isRequired,
};
export { LineChart };
