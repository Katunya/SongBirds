import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Header extends Component {
    render() {
        const list = ['Разминка', 'Водоплавающие', 'Лесные', 'Всеядные', 'Хищные', 'Насекомоядные'];
        const listItem =  list.map((question, index) =>
            <a className={index?"page-link":"page-link actual"} key={index}>{question}</a>
        );
        return (
            <div className='header d-flex'>
                <div className='top-panel d-flex'>
                    <img src={logo} className="logo" alt="logo" />
                    <h5>Score: {this.props.score} </h5>
                </div>
                <QuestionsList />
            </div>
        );
    }
}

class QuestionsList extends Component {
    render() {
        const listBirds = ['Разминка', 'Водоплавающие', 'Лесные', 'Всеядные', 'Хищные', 'Насекомоядные'];
        const birdsItems = listBirds.map((question, index) =>
            <li className={index?"question-item":"question-item actual"} key={index}>{question}</li>
        );
        return (
            <ul className="question-items">{birdsItems}</ul>
        )
    }
}
