import React, { PureComponent } from "react";
import Styles from "./styles.module.css";

class InputError extends PureComponent {

  render() {
    const { className, children, text } = this.props

    return (
      <div className={`${Styles.container} ${className}`}>
        <div className={Styles.text}>{children || text}</div>
      </div>
    )
  }
}

export default InputError;


