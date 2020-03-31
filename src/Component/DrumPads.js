import React, { Component } from 'react';
import '../App.css';

class DrumPads extends Component {
    constructor(props) {
        super(props);

        this.handleAudio = React.createRef();
    }

    playAudio = (e) => {
        if (this.props.power === true) {
            const display = this.props.id.replace(/-/g, ' ');
            const audio = this.handleAudio.current;
            this.props.updatedisplay(display);
            audio.currentTime = 0;
            audio.volume = this.props.currentVolume / 100;
            audio.play();
        }
    }

    handleKeyPress = (e) => {
        if (e.keyCode === this.props.keyCode) {
            this.playAudio();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    render() {
        return (
            <div>
                <div className="drum-pad" onClick={this.playAudio}>
                    <audio
                        className="clip"
                        id={this.props.id}
                        src={this.props.url}
                        ref={this.handleAudio}
                    />
                    {this.props.keyTrigger}
                </div>
            </div>
        );
    }
}

export default DrumPads;