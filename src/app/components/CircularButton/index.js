import React, { PureComponent } from "react";
import Styles from "./styles.module.css";

class CircularButton extends PureComponent {

  render() {
    const { className, onClick, text } = this.props
    return (
      <button className={`${Styles.button} ${className}`} onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default CircularButton;
