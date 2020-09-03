import React, { PureComponent } from "react";
import Styles from "./styles.module.css";
import CustomHeader from "../CustomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const { icon } = props;

  return (
    <div className={Styles.header}>
      <CustomHeader as="h4">
        <div className={Styles.titleIcon}>
          <div className={Styles.icon}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
          </div>
          <div>{props.children}</div>
        </div>
      </CustomHeader>
      <span className={Styles.close} onClick={props.handleModal}>
        &times;
      </span>
    </div>
  );
};

const Content = (props) => {
  return <div className={Styles.content}>{props.children}</div>;
};

const Action = (props) => {
  return <div className={Styles.action}>{props.children}</div>;
};



class CustomModal extends PureComponent {
  render() {
    const { open, size, children } = this.props;
    return (
      <div className={`${open ? Styles.modalOpen : Styles.modalClose}`}>
        <div className={Styles.card} style={{ width: size === "small" ? "40%" : size === "medium" ? "50%" : size === "large" ? "70%" : "40%" }}>
          {children}
        </div>
      </div>
    );
  }

};

CustomModal.Header = Header;
CustomModal.Content = Content;
CustomModal.Action = Action;

export default CustomModal;
