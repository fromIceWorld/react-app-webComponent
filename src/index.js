import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';

import './index.css';
import App from './App';
import { LineChart } from './components/line-chart/line-chart';
import { BarChart } from './components/bar-chart/bar-chart';
import { PieChart } from './components/pie-chart/pie-chart';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 暴露到全局
// @ts-ignore

console.log('react 应用挂载');
const LineCharComponent = reactToWebComponent(LineChart, React, ReactDOM);
window['LineChartComponent'] = LineCharComponent;
window['LineChart'] = LineChart;
customElements.define('line-chart', LineCharComponent);

const BarChartComponent = reactToWebComponent(BarChart, React, ReactDOM);
window['BarChartComponent'] = BarChartComponent;
window['BarChart'] = BarChart;
customElements.define('bar-chart', BarChartComponent);

const PieChartComponent = reactToWebComponent(PieChart, React, ReactDOM);
window['PieChartComponent'] = PieChartComponent;
window['PieChart'] = PieChart;
customElements.define('pie-chart', PieChartComponent);
