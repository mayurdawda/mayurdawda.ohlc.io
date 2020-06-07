import React, { Component } from 'react';
import { render } from 'react-dom';
import MyChart from './MyChart';
import './style.css';

class App extends Component {
  state = {
    ohlc: [],
    volume: []
  };

  componentDidMount() {
    //fetch('http://kaboom.rksv.net/api/historical')
      fetch('https://rawcdn.githack.com/highcharts/highcharts/1a37c045270770251ac68b963614ebcca9b0f5d8/samples/data/aapl-ohlcv.json')
      .then(res => {
        if (!res.ok) {
          console.log('No data')
          return []
        }
        return res.json()
      })
      .then(data => {
        const ohlc = [];
        const volume = [];

        data.forEach(point => {

          ohlc.push([
            point[0], // the date
            point[1], // open
            point[2], // high
            point[3], // low
            point[4] // close
          ]);

          volume.push([
            point[0], // the date
            point[5] // the volume
          ]);
        })
        //console.log(volume);
        this.setState({
          ohlc,
          volume
        })
      })
  }

  handleUpdate = e => {
    const chart = e.target;
    chart.navigationBindings.update();
  }

  render() {
    const { ohlc, volume } = this.state
    if (ohlc.length === 0) return null

    return (
      <div className="app">
        <MyChart ohlc={ohlc} volume={volume} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
