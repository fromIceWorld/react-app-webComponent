import React from 'react';
import { LineChart } from './components/line-chart/line-chart';
import './App.css';
const count = 0;

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
            <div className="App" ref="app">
                <span>REACT{count}</span>
                <span>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </span>
                <LineChart />
                <line-chart></line-chart>
            </div>
        );
    }
}

export default App;
