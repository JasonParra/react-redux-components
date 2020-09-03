
import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./styles.module.css";

class CustomButtom extends PureComponent {

  getInputSize = (name) => {
    const { icon, text, children } = this.props

    switch (name) {
      case "mini":
        return icon && (text || children) ? "8.64px 16.5px 8.64px 0px" : "8.64px 16.5px 8.64px 16.5px";
      case "tiny":
        return icon && (text || children) ? "9.43px 18px 9.43px 0px" : "9.43px 18px 9.43px 18px";
      case "small":
        return icon && (text || children) ? "10.21px 19.5px 10.21px 0px" : "10.21px 19.5px 10.21px 19.5px";
      case "mediun":
        return icon && (text || children) ? "11px 21px 11px 0px" : "11px 21px 11px 21px";
      case "large":
        return icon && (text || children) ? "12.57px 24px 12.57px 0px" : "12.57px 24px 12.57px 24px";
      case "big":
        return icon && (text || children) ? "14.14px 27px 14.14px 0px" : "14.14px 27px 14.14px 27px";
      case "huge":
        return icon && (text || children) ? "15.71px 30px 15.71px 0px" : "15.71px 30px 15.71px 30px";
      case "massive":
        return icon && (text || children) ? "18.68px 36px 18.68px 0px" : "18.68px 36px 18.68px 36px";
      default:
        return icon && (text || children) ? "9.43px 18px 9.43px 0px" : "9.43px 18px 9.43px 18px";
    }
  }

  getTextSize = (name) => {
    switch (name) {
      case "mini":
        return "11px";
      case "tiny":
        return "12px";
      case "small":
        return "13px";
      case "mediun":
        return "14px";
      case "large":
        return "16px";
      case "big":
        return "18px";
      case "huge":
        return "20px";
      case "massive":
        return "24px";
      default:
        return "13px";
    }
  }

  render() {
    const {
      icon,
      text,
      positive,
      negative,
      color,
      textColor,
      children,
      className,
      fluid,
      noBorder,
      size,
      disabled,
      Ref,
      onClick
    } = this.props;

    return (
      <div
        className={`${className}`}>
        <button
          className={`
            ${positive ? Styles.primaryPostive : {}} 
            ${negative ? Styles.primaryNegative : {}}  
            ${!positive && !negative ? Styles.primaryNormal : {}}
            ${className}
          `}
          ref={Ref}
          style={{
            backgroundColor: positive ? "#246fe0" : negative ? "#ef4135" : color || "#fff",
            padding: this.getInputSize(size),
            fontWeight: "400",
            fontFamily: "Arial, Helvetica, 'sans-serif'",
            fontSize: this.getTextSize(size),
            color: positive ? "#fff" : negative ? "#fff" : textColor || "#000",
            border: "1px solid rgba(0, 0, 0)",
            borderRadius: noBorder ? "0px" : "3px",
            width: fluid ? "100%" : "auto",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? "0.5" : "1",
          }}
          onClick={disabled ? (function () { })() : onClick}>
          {icon && (text || children) ? (
            <div className={Styles.buttonContentIcon}>
              <FontAwesomeIcon icon={icon} className={Styles.icon} />
              <div>{text || children}</div>
              <div></div>
            </div>
          ) : text || children ? (
            <div className={Styles.buttonContent}>{text || children}</div>
          ) : icon ? (
            <div className={Styles.buttonContent}>
              <FontAwesomeIcon icon={icon} />
            </div>
          ) : null}
        </button>
      </div>
    );
  }
}

export default CustomButtom


