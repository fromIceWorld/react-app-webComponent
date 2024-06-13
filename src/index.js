import { React } from 'react';
import ReactDOM from 'react-dom';
import r2wc from 'react-to-webcomponent';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { LineChart } from './components/line-chart/line-chart';
import { BarChart } from './components/bar-chart/bar-chart';
import { PieChart } from './components/pie-chart/pie-chart';
import { ChinaMapChart } from './components/china-map/china-map';
import { ChartImage } from './components/chart-image/chart-image';
import { ThreePieChart } from './components/three-pie-chart/three-pie-chart';

require('systemjs');
// import MyTree from 'vue_element/MyTree'; // federated import
// console.log(MyTree);
const script = document.createElement('script');
script.src = 'http://localhost:3002/remoteEntry.js';
document.body.append(script);
setTimeout(() => {
    const container = window['react_app'];
    container.init();
    container.get('BarChartComponent').then((fn) => {
        const federated = fn();
        const createApp = federated['createApp'];
        createApp({}, document.body);
    });
}, 500);
const app = createRoot(document.getElementById('root'));
app.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// 暴露到全局
// @ts-ignore

function registryCustomElements(tagName, cla) {
    if (customElements.get(tagName)) {
        console.warn(`企图注册相同名称的标签: ${tagName}`);
        return;
    }
    customElements.define(tagName, cla);
}

const LineCharComponent = r2wc(LineChart, React, ReactDOM, { options: 123 });
window['LineChartComponent'] = LineCharComponent;
window['LineChart'] = LineChart;
registryCustomElements('line-chart', LineCharComponent);

const BarChartComponent = r2wc(BarChart, React, ReactDOM);
window['BarChartComponent'] = BarChartComponent;
window['BarChart'] = BarChart;
registryCustomElements('bar-chart', BarChartComponent);

const PieChartComponent = r2wc(PieChart, React, ReactDOM);
window['PieChartComponent'] = PieChartComponent;
window['PieChart'] = PieChart;
registryCustomElements('pie-chart', PieChartComponent);

const ChartImageComponent = r2wc(ChartImage, React, ReactDOM);
window['ChartImageComponent'] = ChartImageComponent;
window['ChartImage'] = ChartImage;
registryCustomElements('chart-image', ChartImageComponent);

const ChinaMapChartComponent = r2wc(ChinaMapChart, React, ReactDOM);
window['ChinaMapChartComponent'] = ChinaMapChartComponent;
window['ChinaMapChart'] = ChinaMapChart;
registryCustomElements('china-map-chart', ChinaMapChartComponent);

const ThreePieChartComponent = r2wc(ThreePieChart, React, ReactDOM);
window['ThreePieChartComponent'] = ThreePieChartComponent;
window['ThreePieChart'] = ThreePieChart;
registryCustomElements('three-pie-chart', ThreePieChartComponent);

console.log('react@18.2.0 + echarts@5.4.2 应用加载');
