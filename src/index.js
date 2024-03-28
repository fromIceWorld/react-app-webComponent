import React from 'react';
import ReactDOM from 'react-dom/client';
import r2wc from 'react-to-webcomponent';

import './index.css';
import App from './App';
import { LineChart } from './components/line-chart/line-chart';
import { BarChart } from './components/bar-chart/bar-chart';
import { PieChart } from './components/pie-chart/pie-chart';
import { ChinaMapChart } from './components/china-map/china-map';
import { BackgroundImage } from './components/background-image/background-image';

import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// 暴露到全局
// @ts-ignore

const LineCharComponent = r2wc(LineChart, React, ReactDOM, { options: 123 });
window['LineChartComponent'] = LineCharComponent;
window['LineChart'] = LineChart;
customElements.define('line-chart', LineCharComponent);

const BarChartComponent = r2wc(BarChart, React, ReactDOM);
window['BarChartComponent'] = BarChartComponent;
window['BarChart'] = BarChart;
customElements.define('bar-chart', BarChartComponent);

const PieChartComponent = r2wc(PieChart, React, ReactDOM);
window['PieChartComponent'] = PieChartComponent;
window['PieChart'] = PieChart;
customElements.define('pie-chart', PieChartComponent);

const ChinaMapChartComponent = r2wc(ChinaMapChart, React, ReactDOM);
window['ChinaMapChartComponent'] = ChinaMapChartComponent;
window['ChinaMapChart'] = ChinaMapChart;
customElements.define('china-map-chart', ChinaMapChartComponent);

const BackgroundImageComponent = r2wc(BackgroundImage, React, ReactDOM);
window['BackgroundImageComponent'] = BackgroundImageComponent;
window['BackgroundImage'] = BackgroundImage;
customElements.define('backend-image', BackgroundImageComponent);

console.log('react@18.2.0 + echarts@5.4.2 应用加载');
