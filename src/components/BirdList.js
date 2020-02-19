import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class BirdList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: false,
            score: 5,
            birdInfo: null,
        };
        this.nextLvl = React.createRef();
    }

    correctBird = (birdInfo,e) => {
        this.setState({
            birdInfo: birdInfo,
        });
        if(document.querySelector('.success')){
          this.setState({
              correctBird: true,
          });
            return;
        }
        if(birdInfo.name === this.props.birdsData[this.props.currentRound][this.props.randomNum].name) {
            e.target.firstChild.classList.add("success");
            this.nextLvl.current.classList.add("btn-next");
            this.props.correctBirdName(birdInfo);
            this.props.changeScore(this.state.score);
            this.setState({
                correctAnswer: true,
                score: 5,
            });
        }
        else {
            if (e.target.firstChild.classList.contains("error")) return;
            e.target.firstChild.classList.add("error");
            this.setState({
                score: this.state.score - 1,
            });
        }
    };

    nextRound = () =>{
        if(!this.state.correctAnswer) return;
        this.nextLvl.current.classList.remove("btn-next");
        const questionList = document.querySelector('.question-items').childNodes.length - 1;
        if (this.props.currentRound === questionList - 1) {
            this.nextLvl.current.firstChild.innerHTML = 'FINISH!'
        }
        if (this.props.currentRound < questionList) {
            document.querySelector('.actual').nextElementSibling.classList.add("actual");
            document.querySelector('.actual').classList.remove("actual");
            this.setState({
                isCorrectAnswer: false,
                birdInfo: null,
            });
            this.props.nextActualRound();
            this.props.correctBirdName();
            document.querySelectorAll('.list-group-item').forEach((e) => {
                e.firstChild.classList.remove("success");
                e.firstChild.classList.remove("error");
            });
        }
        else {
            [document.querySelector('.rounded'), document.querySelector('.birds-wrapper'), this.nextLvl.current].forEach((e) => {
                e.classList.add('hide');
            });
            document.querySelector('.final-container').classList.remove('hide');
        }
    };

    render() {
        const birdsData = this.props.birdsData;
        const birdsList = birdsData[this.props.currentRound].map((birdInfo, index) => {
            return <li className="list-group-item" key={birdInfo.id} onClick={this.correctBird.bind(this, birdInfo)}>
                <div className="point" />{birdInfo.name}</li>
        });
        return (
            <div>
                <div className="birds-wrapper">
                    <div className="col-md-6">
                        <ul className='item-list list-group'>{birdsList}</ul>
                    </div>
                    <BirdInfo birdInfo={this.state.birdInfo} />
                </div>
                <button className="btn" ref={this.nextLvl} onClick={this.nextRound}>Next Level</button>
            </div>
        );
    }
}
class BirdInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birdDescriptionDefault: <div><p>Послушайте плеер.</p><p>Выберите птицу из списка</p></div>,
        }
    }
    render() {
        const birdInfo = this.props.birdInfo;
        return (
            <div className="jumbotron bird-info">{!birdInfo || (!document.querySelector('.success') && !document.querySelector('.error')) ?
                this.state.birdDescriptionDefault :
                <div>
                    <div className="bird-description">
                        <img className='bird-image' src={birdInfo.image} alt="bird"/>
                        <ul className="bird-body">
                            <li>{birdInfo.name}</li>
                            <li>{birdInfo.species}</li>
                            <li><ReactAudioPlayer className="bird-info-audio-player" src={birdInfo.audio} controls /></li>
                        </ul>
                    </div>
                    <p className="bird-description-info">{birdInfo.description}</p>
                </div>}</div>
        );
    }
}

