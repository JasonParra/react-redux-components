import React, { PureComponent } from "react";
import Styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CustomLink extends PureComponent {

  render() {
    const { children, text, onClick, icon } = this.props;

    return (
      <div className={Styles.container}>
        <FontAwesomeIcon icon={icon} />
        <div className={Styles.text} onClick={(e) => onClick}>
          {children || text}
        </div>
      </div>
    )
  }
}

export default CustomLink;


