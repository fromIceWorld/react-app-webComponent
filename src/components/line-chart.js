import React from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom/client';
import { config } from '../decorators/config';
import { LINE_CHART_CONFIG } from './line-chart-config';

@config(LINE_CHART_CONFIG)
class LineChart extends React.Component {
    componentDidMount() {
        this.initChart();
    }
    width = '200px';
    height = '200px';
    initChart() {
        let chart = echarts.init(this.refs.lineChart);
        chart.setOption({
            title: {
                text: 'ECharts 入门示例',
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        });
    }
    render() {
        return (
            <div
                className="line-chart"
                ref="lineChart"
                style={{ width: this.width, height: this.height }}
            ></div>
        );
    }
}
LineChart.propTypes = {
    name: PropTypes.string.isRequired,
};
export { LineChart };
