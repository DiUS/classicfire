import React, { Component } from "react";

import canvasHelper from "./canvasHelper";
import cursor from "./pencil.png";
import styles from "./Canvas.css";

class Canvas extends Component {
  state = {
    suggestions: []
  };

  populateSuggestions = suggestions => {
    this.setState({ suggestions }, () => this.props.onSuggestions(suggestions));
  };

  componentDidMount() {
    this.canvasHelper = new canvasHelper(this.canvas, this.populateSuggestions);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.foundMatch && nextProps.foundMatch) {
      this.canvasHelper.handleMouseUp();
    }

    if (this.props.foundMatch && !nextProps.foundMatch) {
      this.canvasHelper.resetCanvas();
    }
  }

  reset() {
    this.canvasHelper.resetCanvas();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <canvas
          className={this.props.foundMatch ? styles.canvasZoom : styles.canvas}
          ref={c => (this.canvas = c)}
          style={{ cursor: `url(${cursor}) 0 32, auto` }}
        />
        <span className={styles.restart} onClick={this.reset.bind(this)}>
          ✖ restart drawing
        </span>
        <div>
          {this.state.suggestions.map(s => (
            <div>{s.keyword}</div>
          ))}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({ foundMatch: !!state.matched });
// export default connect(mapStateToProps)(Canvas);
export default Canvas;
