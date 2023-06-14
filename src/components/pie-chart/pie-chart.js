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
        this.state = {
            width: '400px',
            height: '200px',
            data: [],
            title: '',
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
        const { title, data, width, height } = config;
        this.setState({
            width: width || '100%',
            height: height || this.state.height,
        });
        // 应用chart 数据
        option.title[0].text = title;
        option.series[0].data = data;
        this.chart.setOption(option);
    }
    componentDidMount() {
        this.initChart();
        this.resizeObserver();
    }
    // 监听容器width，height
    resizeObserver() {
        const chartObserver = new ResizeObserver(() => this.chart.resize());
        chartObserver.observe(this.refs.pieChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.pieChart);
        chart.setOption({
            title: {
                text: this.state.title,
                left: 'center',
            },
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
        });
        this.chart = chart;
    }
    render() {
        return (
            <div
                className="pie-chart"
                ref="pieChart"
                style={{ width: this.state.width, height: this.state.height }}
            ></div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${PieChart.tagNamePrefix}-${index}`;
        const { html: config } = option;
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
            js: `class PieChart${index} extends PieChartComponent{
                    that;
                    constructor(){
                        super();
                        setTimeout(()=>{
                            let index = Object.keys(this).filter(key=>key.startsWith('__reactContainer'));
                            let ins = this.that = this[index[0]].alternate.child.stateNode;
                            ins.${init}
                        },300);
                    }
                    get config(){
                        console.log('config');
                    }
                    set config(value){
                        console.log('value',value)
                        const {title,data,width,height} = value || {};
                        this.that.applyData({title,data,width,height});
                    }   
                };
                customElements.define('${tagName}',PieChart${index});
                `,
        };
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        connectedCallback: true,
    };
}
PieChart.propTypes = {
    name: PropTypes.string.isRequired,
};
export { PieChart };
