import React from 'react';
import { LineChart } from './components/line-chart/line-chart';
import './App.css';
import { PieChart } from './components/pie-chart/pie-chart';
import { BarChart } from './components/bar-chart/bar-chart';
import { BackgroundImage } from './components/background-image/background-image';
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
                <div style={{ height: '800px' }}>
                    <china-map-chart></china-map-chart>
                </div>

                <div style={{ height: '300px' }}>
                    <LineChart />
                </div>
                <div style={{ height: '300px' }}>
                    <PieChart />
                </div>
                <div style={{ height: '300px' }}>
                    <BarChart />
                </div>
                <div style={{ height: '300px' }}>
                    <BackgroundImage />
                </div>
            </div>
        );
    }
}

export default App;
