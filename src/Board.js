import React, { Component } from 'react';
import Letter from './Letter';

class Board extends Component {
    renderLetters() {
        let board = this.props.board;
        let rows = [];
        board.forEach((letter) => {
            if (rows.length === 0 || rows[rows.length - 1].length === 8) {
                rows.push([]);
            }
            let row = rows[rows.length - 1];
            row.push(letter);
        })
        return rows.map((row, index) => (
            <div className="BoardRow" key={index}>
                {this.renderRow(row)}
            </div>
        ))
    }
    renderRow(row) {
        return row.map((letter) => {
            return (
                <Letter 
                    key={letter.index} 
                    letter={letter}
                    onLetterMouseDown={(e) => this.props.onLetterMouseDown(letter.index, e)}
                    onLetterMouseUp={(e) => this.props.onLetterMouseUp(letter.index, e)}
                    onLetterMouseOver={(e) => this.props.onLetterMouseOver(letter.index, e)}
                />
            )
        });
    }
    render() {
        return (
            <div className="Board">
            {this.renderLetters()}
            </div>
        );
    }
}

export default Board;