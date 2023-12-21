import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import { config } from '../../decorators/config.js';
import { PIE_CHART_CONFIG } from './pie-chart-config.js';
import { transform, assign } from '../../common/index.js';

window['React.Component'] = React.Component;
@config(PIE_CHART_CONFIG)
class PieChart extends React.Component {
    static tagNamePrefix = 'pie-chart';
    constructor(props) {
        super(props);
        this.state = {};
    }
    chart;
    carousel = true;
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
    carouseIndex = 0;
    carouselEvent;
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
        chartObserver.observe(this.refs.pieChart);
    }
    initChart() {
        let chart = echarts.init(this.refs.pieChart);
        chart.setOption(this.option);
        this.chart = chart;
        if (this.carousel) {
            this.selectPie();
            this.chart.on('mouseover', (params) => {
                // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
                clearInterval(this.carouselEvent);
                this.carouseIndex = params.dataIndex;
                this.highlightPie();
            });
            this.chart.on('mouseout', (params) => {
                // 用户鼠标移出时，重新开始自动切换
                if (this.carouselEvent) clearInterval(this.carouselEvent);
                this.selectPie();
            });
        }
    }
    selectPie() {
        this.carouselEvent = setInterval(() => {
            // 高亮效果切换到下一个图形
            var dataLen = this.option.series[0].data.length;
            this.carouseIndex = (this.carouseIndex + 1) % dataLen;
            this.highlightPie();
        }, 1500);
    }
    highlightPie() {
        // 取消所有高亮并高亮当前图形
        this.option.series[0].data.forEach((item, index) => {
            this.chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: index,
            });
        });
        // 高亮当前图形
        this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.carouseIndex,
        });
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
        const { html } = option,
            [color, title, tooltip, legend, grid, series, auto] = html;
        const autoCarousel = auto.config.auto.value;
        const config = JSON.stringify({
            ...transform(color.config),
            ...transform(title.config),
            ...transform(tooltip.config),
            ...transform(legend.config),
            ...transform(grid.config),
            ...transform(series.config),
        });
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class PieChart${index} extends PieChartComponent{
                    that;
                    constructor(){
                        super();
                    }
                    get carousel(){
                        return ${autoCarousel}
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
