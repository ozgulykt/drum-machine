import React from 'react';
import '../App.css';

const RangeSlider = (props) => {
    return (
        <div className="slider">
            <span className="bar"><span className="fill" id="fill"></span></span>
            <input className="thumb" id="thumb" type="range" min="0" max="100" step="1" 
            value={props.volume} 
            onChange={props.onChange}
            onClick={props.onChange}
             />
        </div>
    );
}

export default RangeSlider;