import React, { Component } from 'react';
import Header from "./Header";
import birdsData from "./Data";
import RandomBird from "./RandomBird";
import BirdList from "./BirdList";
import Final from "./Final";
import birdImg from '../unknownBirds.svg';

export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            birdName: '******',
            birdImg: birdImg,
            score:0,
            currentRound: 0,
            random: this.getRandomInt(birdsData[0].length),
            maxScore: birdsData.length * birdsData[0].length - birdsData[0].length,
        }
    }

    correctBirdName = (birdInfo) => {
        if(!birdInfo){
            this.setState ( {
                birdImg: birdImg,
                birdName: '******',
            });
            return;
        }
        this.setState({
            birdImg: birdInfo.image,
            birdName: birdInfo.name,
        });
    };

    nextActualRound = () => {
        this.setState({
            currentRound: this.state.currentRound + 1,
            random: this.getRandomInt(birdsData[0].length),
        });
    };

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    changeScore = (num) => {
        this.setState( {
            score: this.state.score + num,
        })
    };

    restartGame = () => {
        this.setState({
            random: this.getRandomInt(birdsData[0].length),
            birdImg: birdImg,
            birdName: '*****',
            score: 0,
            currentRound: 0,
        });
        [document.querySelector('.rounded'), document.querySelector('.birds-wrapper'), document.querySelector('.btn')].forEach((e) => {
            e.classList.remove('hide');
        });
        document.querySelector('.final-container').classList.add('hide');
        this.correctBirdName();
        document.querySelectorAll('.list-group-item').forEach((e) => {
            e.firstChild.classList.remove("success");
            e.firstChild.classList.remove("error");
        });
        document.querySelector('.actual').classList.remove("actual");
        document.querySelector('.question-item').classList.add("actual");
        document.querySelector('.btn').firstChild.innerHTML = 'Next Level';
    };


    render() {
        return (
            <div className="container">
            <Header score={this.state.score}/>
            <RandomBird
                birdsData={birdsData}
                randomNumber={this.state.random}
                birdName={this.state.birdName}
                birdImg={this.state.birdImg}
                currentRound={this.state.currentRound}
            />
            <BirdList
                birdsData={birdsData}
                randomNum={this.state.random}
                correctBirdName={this.correctBirdName}
                changeScore={this.changeScore}
                currentRound={this.state.currentRound}
                nextActualRound={this.nextActualRound}
            />
            <Final
                    score={this.state.score}
                    maxScore={this.state.maxScore}
                    restartGame={this.restartGame}
                />
            </div>
        );
    }
}
