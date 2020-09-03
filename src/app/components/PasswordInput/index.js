import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isPhone } from "../../utils/validator";
import Styles from "./styles.module.css";
import CustomInput from "../CustomInput";
import { faEye, faEyeSlash, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class passwordInput extends PureComponent {
  state = {
    type: true,
  };

  handleType = () => {
    const { type } = this.state;
    this.setState({
      type: !type,
    });
  };

  formatPhone = (phone) => {
    if (phone[0] !== 1) return "1" + phone;
    else return phone;
  };

  formatEvent = (e) => {
    return {
      ...e,
      target: {
        name: e.target.name,
        value: isPhone(e.target.value) && e.target.value.length === 10 ? this.formatPhone(e.target.value) : e.target.value,
      },
    };
  };

  render() {
    const { type } = this.state;
    return (
      <div className={Styles.container}>
        <CustomInput
          className={Styles.input}
          placeholder={"Contraseña"}
          type={type ? "password" : "text"}
          onChange={(e) => this.props.onChange(this.formatEvent(e))}
          name={this.props.name}
          value={this.props.value}
          icon={faLock}
          error={this.props.error}
          action={
            this.props.value
              ? {
                icon: faTimes,
                onClick: (e) => this.props.onChange({ ...e, target: { ...e.target, value: "", name: this.props.name } }),
              }
              : false
          }
          autoComplete="off"
          fluid={this.props.fluid}
          size={this.props.size}></CustomInput>
        <FontAwesomeIcon
          icon={!type ? faEye : faEyeSlash}
          onClick={() => this.handleType()}
          className={this.props.value ? Styles.icon1 : Styles.icon2}
          size={"1x"}></FontAwesomeIcon>
      </div>
    );
  }
}

passwordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default passwordInput;
