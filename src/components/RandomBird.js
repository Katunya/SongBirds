import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class RandomBird extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birdAudio: '',
        };
    }

    render() {
        const birdsData= this.props.birdsData;
        return (
            <div className='random-bird jumbotron rounded'>
                <img src={this.props.birdImg} className='bird-image' alt="bird"/>
                <div>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <h3>{this.props.birdName}</h3>
                        </li>
                        <li className='list-group-item'>
                            <ReactAudioPlayer
                            className='controls'
                            src={birdsData[this.props.currentRound][this.props.randomNumber].audio}
                            ref={(element) => { this.rap = element; }}
                            controls
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
