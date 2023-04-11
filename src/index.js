import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';

import './index.css';
import App from './App';
import { LineChart } from './components/line-chart';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
const LineCharComponent = reactToWebComponent(LineChart, React, ReactDOM);

// 暴露到全局
// @ts-ignore
console.log('react 应用挂载');
window['LineChartComponent'] = LineCharComponent;
window['LineChart'] = LineChart;
customElements.define('line-chart', LineCharComponent);
