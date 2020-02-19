import React, {Component} from 'react'
import birdsFinal from './final.gif'

export default  class GameEnd extends Component {
    render() {
        const content = this.props.score === this.props.maxScore ?
            <div className="final-container hide">
                <h2 className="text-primary congrats">Теперь ты знаешь кто чирикнул)</h2>
                <p className='lead text-center'>просто умничка!</p>
            </div>
            :
            <div className="final-container hide">
                <h1 className="display-3 text-center">Урааа!</h1>
                <p className='lead text-center'>Ты набрал {this.props.score} из {this.props.maxScore} возможных!</p>
                <img src={birdsFinal} alt="birds"/>
                <button className="btn btn-next btn-game-over" onClick={this.props.restartGame}>Еще раз?</button>
            </div>
        return (
            <div>{content}</div>
        );
    }
}


