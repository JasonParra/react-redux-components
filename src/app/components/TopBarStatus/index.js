import React, { PureComponent } from "react";
import Styles from "./styles.module.css";
import CustomLabel from "../CustomLabel";
import CustomHeader from "../CustomHeader";

class TopBarStatus extends PureComponent {

  render() {
    const { entry, agent, client } = this.props

    return (
      <div className={Styles.contianer}>
        <div className={Styles.boxLeft}>
          <CustomHeader as="h7">{entry}</CustomHeader>
          <CustomLabel as="h7">{"Entrada"}</CustomLabel>
        </div>
        <div className={Styles.box}>
          <CustomHeader as="h7">{agent}</CustomHeader>
          <CustomLabel as="h7">{"Agente"}</CustomLabel>
        </div>
        <div className={Styles.boxRight}>
          <CustomHeader as="h7">{client}</CustomHeader>
          <CustomLabel as="h7">{"Cliente"}</CustomLabel>
        </div>
      </div>
    );
  }
}

export default TopBarStatus;