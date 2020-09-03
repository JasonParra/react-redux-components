import React, { PureComponent } from "react";
import { Input, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import Styles from "./styles.module.css";

class searchInput extends PureComponent {
  render() {
    return (
      <div className={Styles.container}>
        <Icon
          name={this.props.value ? "cancel" : "search"}
          onClick={(e) => this.props.onChange({ ...e, target: { name: this.props.name, value: "" } })}
          className={Styles.iconSeacrhInput}></Icon>
        <Input
          size={"mini"}
          className={Styles.searchInput}
          icon={this.props.icon}
          placeholder={"Buscar"}
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}></Input>
      </div>
    );
  }
}

searchInput.propTypes = {
  clearInput: PropTypes.func.isRequired,
};

export default searchInput;
