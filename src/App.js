import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    let initialBoard = [
      "b", "z", "u", "r", "e", "s", "o", "r",
      "x", "h", "p", "f", "s", "p", "m", "p", 
      "t", "h", "o", "r", "n", "o", "p", "m", 
      "p", "i", "s", "h", "a", "r", "k", "d", 
      "c", "s", "k", "i", "r", "t", "l", "i", 
      "f", "u", "r", "h", "r", "s", "i", "r", 
      "m", "p", "u", "r", "p", "l", "e", "t", 
      "v", "d", "i", "n", "n", "e", "r", "y", 
    ]
    let words = {
      "skirt": "green", 
      "thorn": "blue", 
      "purple": "purple", 
      "dinner": "yellow", 
      "fur": "brown", 
      "sports": "orange", 
      "shark": "turquoise", 
      "dirty": "pink"
    }
    let state = initialBoard.map((letter, index) => {
      return {
        letter,
        index,
        status: "unclicked",
        isSelected: false
      }
    })
    this.state = {
      board: state,
      selection: [],
      dragging: false,
      words
    }
  }
  onLetterMouseDown(i, event) {
    let board = [...this.state.board];
    let letter = {...board[i]};
    letter.isSelected = true;
    board[i] = letter;

    this.setState({
      dragging: true,
      selection: [...this.state.selection, letter],
      board: board
    })
    console.log("down", letter);
  }
  onLetterMouseUp(i, event) {
    let letter = this.state.board[i];
    console.log("up", letter);
  }
  onLetterMouseOver(i, event) {
    if (!this.state.dragging) return;
    let board = [...this.state.board];
    let letter = {...board[i]};
    letter.isSelected = true;
    board[i] = letter;
    let selection = this.state.selection;
    let previousLetter = selection[selection.length - 1];
    this.setState({
      selection: [...this.state.selection, letter],
      board
    })
  }
  endDrag(event) {
    if (!this.state.dragging) return;
    this.setState({dragging: false});

    let board = [...this.state.board];
    let words = this.state.words;
    let selection = this.state.selection;
    let word = selection.map(letter => letter.letter).join("");
    console.log(word);
    let color = words[word];
    if (color) {
      selection.forEach((letter) => {
        letter.status = "completed";
        letter.isSelected = false;
        if (!letter.colors) letter.colors = [];
        if (!letter.colors.find(e => e === color)) {
          letter.colors.push(words[word]);
        }
        board[letter.index] = letter;
        console.log(letter);
      });
      this.setState({board});
    } else {
      selection.forEach((letter) => {
        letter.status = "unclicked";
        letter.isSelected = false;
        board[letter.index] = letter;
      });
    }
    this.setState({selection: []})
  }
  render() {
    return (
      <div className="App" onMouseUp={e => this.endDrag(e)}>
        <Board board={this.state.board} 
          onLetterMouseUp={(i,e) => this.onLetterMouseUp(i, e)} 
          onLetterMouseDown={(i, e) => this.onLetterMouseDown(i, e)}
          onLetterMouseOver={(i, e) => this.onLetterMouseOver(i,e)}
          words={this.state.words}
        />
      </div>
    );
  }
}

export default App;
