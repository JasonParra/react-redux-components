import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./styles.module.css";

class CustomInput extends PureComponent {

  getPaddingAction = (name) => {

    switch (name) {
      case "mini":
        return "13px 7px";
      case "tiny":
        return "9.43px 7px";
      case "small":
        return "14px 7px";
      case "large":
        return "12px 7px";
      case "big":
        return "14.14px 7px";
      case "huge":
        return "15.71px 7px";
      case "massive":
        return "18.68px 7px";
      default:
        return "13.5px 7px";
    }
  }

  getPadding = (name) => {

    switch (name) {
      case "mini":
        return "8.64px 16.5px";
      case "tiny":
        return "9.43px 18px";
      case "small":
        return "10.21px 19.5px";
      case "large":
        return "12.57px 24px";
      case "big":
        return "14.14px 27px";
      case "huge":
        return "15.71px 30px";
      case "massive":
        return "18.68px 36px";
      default:
        return "9.43px 18px";
    }
  }

  getWidth = (name) => {
    const { fluid } = this.props

    if (fluid)
      return "100%";
    else
      switch (name) {
        case "mini":
          return "110px";
        case "small":
          return "135px";
        case "large":
          return "185px";
        case "big":
          return "215px";
        case "huge":
          return "255px";
        case "massive":
          return "307px";
        default:
          return "135px";
      }
  }

  getHeight = (name) => {
    switch (name) {
      case "mini":
        return "4px";
      case "small":
        return "8px";
      case "large":
        return "12px";
      case "big":
        return "14px";
      case "huge":
        return "16px";
      case "massive":
        return "20px";
      default:
        return "8px";
    }
  }

  getTextSize = (name) => {
    switch (name) {
      case "mini":
        return "16px";
      case "small":
        return "16px";
      case "large":
        return "18px";
      case "big":
        return "20px";
      case "huge":
        return "24px";
      case "massive":
        return "26px";
      default:
        return "14px";
    }
  }


  render() {
    const {
      className,
      fluid,
      icon,
      action,
      size,
      error,
      Ref,
      type,
      placeholder,
      id,
      onClick,
      name,
      value,
      onChange,
      defaultValue,
      autoComplete
    } = this.props

    return (
      <div className={`${Styles.container} ${className}`} style={{ width: fluid ? "100%" : "auto" }}>
        <div
          style={icon ? {
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: action ? "3px 0px 0px 3px" : "3px",
            overflow: "hidden",
            width: fluid ? "100%" : size ? this.getWidth(size) : "auto",
            backgroundColor: error ? "#f8d9d8" : "#fff",
          } : {}}>
          {icon ? (
            <FontAwesomeIcon
              icon={icon}
              style={{
                position: "sticky",
                margin: "5px -5px 5px 10px",
                backgroundColor: error ? "#f8d9d8" : "#fff",
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: fluid ? "100%" : size ? this.getWidth(size) : "auto",
              backgroundColor: error ? "#f8d9d8" : "#fff",
            }}>
            <input
              ref={Ref}
              id={id}
              onClick={onClick || null}
              className={`${Styles.input} `}
              name={name}
              type={type}
              style={{
                height: this.getHeight(size),
                width: fluid ? "100%" : size ? this.getWidth(size) : "auto",
                padding: this.getPadding(size),
                fontSize: this.getTextSize(size),
                fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,Open Sans,Helvetica Neue,sans-serif",
                borderRadius: action ? "3px 0px 0px 3px" : "3px",
                border: icon ? "0px" : "1px solid #dcdcdc",
                flex: icon ? "1" : "none",
                backgroundColor: error ? "#f8d9d8" : "#fff",
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              defaultValue={defaultValue}
              autoComplete={autoComplete}
            />
          </div>
        </div>
        {action ? (
          <button
            className={Styles.actionButton}
            style={{
              height: this.getHeight(size),
              padding: this.getPaddingAction(size),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRightWidth: "0px",
              border: "1px solid #ccc",
              borderLeftWidth: "0px",
              backgroundColor: error ? "#f8d9d8" : "#fff",
              width: 'auto',
              cursor: 'pointer'
            }}
            onClick={action.onClick}>
            <FontAwesomeIcon icon={action.icon}></FontAwesomeIcon>
          </button>
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default CustomInput;

