import React, { PureComponent } from "react";
import Styles from "./styles.module.css";

const Header = (props) => {
  return <div className={Styles.header}>{props.children}</div>;
};

const Content = (props) => {
  return <div className={Styles.content}>{props.children}</div>;
};

const Action = (props) => {
  return <div className={Styles.action}>{props.children}</div>;
};

class CustomCard extends PureComponent {

  render() {
    const { style, children } = this.props
    return <div style={style}>{children}</div>;
  }
};

CustomCard.Header = Header;
CustomCard.Content = Content;
CustomCard.Action = Action;

export default CustomCard;
