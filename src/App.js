import React from 'react';
import './App.css';
import { ThreePieChart } from './components/three-pie-chart/three-pie-chart';

class App extends React.Component {
    state = { date: new Date() };
    tick() {
        this.setState({
            date: new Date(),
        });
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div className="App" ref="app" style={{ height: '100%' }}>
                <div style={{ height: '100%' }}>
                    <chart-image></chart-image>
                </div>
                <div style={{ height: '100%' }}>
                    <china-map-chart></china-map-chart>
                </div>

                <div style={{ height: '300px' }}>
                    <line-chart />
                </div>
                <div style={{ height: '300px' }}>
                    <pie-chart />
                </div>
                <div style={{ height: '300px' }}>
                    <bar-chart />
                </div>
                <div style={{ height: '208px' }}>
                    <three-pie-chart />
                </div>
            </div>
        );
    }
}

export default App;
