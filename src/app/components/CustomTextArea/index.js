import React, { Component } from 'react'
import Styles from './styles.module.css'

class CustomTextArea extends Component {

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
  getWidth = (name) => {
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
  render() {
    const {
      name,
      fluid,
      placeholder,
      onChange,
      value,
      className,
      size,
      icon,
      error
    } = this.props

    return (
      <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={`${className} ${Styles.textArea}`}
        style={{
          width: fluid ? "100%" : size ? this.getWidth(size) : "auto",
          fontSize: this.getTextSize(size),
          border: icon ? "0px" : "1px solid #dcdcdc",
          flex: icon ? "1" : "none",
          backgroundColor: error ? "#f8d9d8" : "#fff",
        }}>
      </textarea>
    )
  }
}

export default CustomTextArea
