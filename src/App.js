import React from 'react';
import './App.css';

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
                    <line-chart />
                </div>
                <div style={{ height: '300px' }}>
                    <pie-chart />
                </div>
                <div style={{ height: '300px' }}>
                    <bar-chart />
                </div>
                <div style={{ height: '300px' }}>
                    <BackgroundImage />
                </div>
            </div>
        );
    }
}

export default App;
