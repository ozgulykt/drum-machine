import React, { Component } from 'react';
import './App.css';
import DrumPads from './Component/DrumPads';
import RangeSlider from './Component/RangeSlider';
import { bankOne, bankTwo } from './utilities/Audios'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      power: false,
      display: '',
      bankstate: false,
      bank: bankOne,
      currentVolume: 20
    }
  }

  powerState = () => {
    setTimeout(() => this.setState({display: ''}), 10);
    this.setState({
      power: !this.state.power
    })
  }

  bankState = () => {
    if (this.state.power === true) {
      this.setState({
        bankstate: !this.state.bankstate
      });
      this.chooseBankArr(!this.state.bankstate);
    }
  }

  chooseBankArr = (bankstate) => {
    bankstate ?
      this.setState({
        bank: bankTwo,
        display: 'Smooth Piano Kit'
      })
      : this.setState({
        bank: bankOne,
        display: 'Heater Kit'
      })
  }

  updatedisplay = (id) => {
    this.setState({
      display: id
    })
  }

  changeVolume = (v) => {
    this.setState({
      currentVolume: v.target.value,
      display: "Volume: " + Math.round(v.target.value)
    });
    this.rangeStyle(this.state.currentVolume);
  }

  rangeStyle = (rangeVol) => {
    document.getElementById("thumb").addEventListener("mousemove", function() {
      document.getElementById("fill").style.width = rangeVol + '%';
    });
    setTimeout(() => this.setState({display: ''}), 1000);
  }

  clickRangeStyle = () => {
    document.getElementById("thumb").addEventListener("mouseleave", function() {
      document.getElementById("fill").style.width = this.state.currentVolume + '%';
    });
    setTimeout(() => this.setState({display: ''}), 1000);
  }

  render() {
    return (
      <div className="row rounded" id="drum-machine">
        <div className="row row-cols-3 align-items-center m-8 border-box">
          {this.state.bank.map((currentValue, index, bankArr) => (
            <DrumPads
              key={index.toString()}
              keyCode={bankArr[index].keyCode}
              keyTrigger={bankArr[index].keyTrigger}
              url={bankArr[index].url}
              power={this.state.power}
              id={bankArr[index].id}
              updatedisplay={this.updatedisplay}
              currentVolume={this.state.currentVolume}
            />
          ))}
        </div>
        <div className="right-box">
          <div>
            <div className="power form-control-plaintext row">Power</div>
            <input
              type="checkbox"
              className="row power-switch"
              onChange={this.powerState} />
          </div>
          <div>
            <div className="bank form-control-plaintext row">Bank</div>
            <input
              type="checkbox"
              className="row bank-switch"
              onChange={this.bankState}
              updatedisplay={this.displayName} />
          </div>
          <div>
            <input type="text" id="display" className="text-uppercase" value={this.state.display} readOnly />
          </div>
          <RangeSlider
            onChange={this.changeVolume}
            volume={this.state.currentVolume}
            onClick={this.clickRangeStyle} />
        </div>
      </div>
    );
  }
}

export default App;
