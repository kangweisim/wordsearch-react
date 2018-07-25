import React, { Component } from 'react';

class Letter extends Component {
    
    render () {
        let status = this.props.letter.status;
        let isSelected = this.props.letter.isSelected;
        let colors = this.props.letter.colors || [];
        if (isSelected) colors.push("gray");
        if (!isSelected) {
            let newColors = [];
            colors.forEach((color) => {
                if (color !== "gray") {
                    newColors.push(color);
                }
            })
            colors = newColors;
        }
        colors = colors.map((color, index) => {
            let rgba = "";
            switch(color) {
                case "gray":
                rgba = "rgba(211,211,211, 0.9)";
                break;
                case "green":
                rgba = "rgba(127,255,0, 0.5)"
                break;
                case "blue":
                rgba = "rgba(0,191,255,0.5)"
                break;
                case "purple":
                rgba = "rgba(148,0,211, 0.5)"
                break;
                case "yellow":
                rgba = "rgba(255,215,0, 0.5)"
                break;
                case "brown":
                rgba = "rgba(139,69,19,0.5)"
                break;
                case "orange":
                rgba = "rgba(255,140,0,0.5)"
                break;
                case "turquoise":
                rgba = "rgba(0,255,255,0.5)"
                break;
                case "pink":
                rgba = "rgba(255,0,255,0.5)"
                break;
                default:
                break;
            }
            let style = {};
            if (rgba) style.backgroundColor = rgba;
            return (
                <div className="overlay" key={index} style={style}></div>
            )
        });
        return (
            <div className={'letter'}
            onMouseDown={(e) => this.props.onLetterMouseDown(e)}
            onMouseUp={(e) => this.props.onLetterMouseUp(e)}
            onMouseOver={(e) => this.props.onLetterMouseOver(e)}
            >
            { this.props.letter.letter }
            { colors }
            </div>
        )
    }
}

export default Letter;