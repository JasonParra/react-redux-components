import React, { PureComponent } from "react";
import styles from "./styles.module.css";

class ChatButtonsFilter extends PureComponent {

  render() {
    const { value, notify, onChange } = this.props;

    return (
      <div className={styles.contianer}>
        <div className={value === "all" ? styles.boxSelected : styles.box} onClick={(e) => onChange(e, "all")}>
          {"Todos"}
          {notify[0] ? <div className={styles.messageCounter1}>{notify[0]}</div> : null}
        </div>
        <div className={value === "entrada" ? styles.boxSelected : styles.box} onClick={(e) => onChange(e, "entrada")}>
          {"Entrada"}
          {notify[1] ? <div className={styles.messageCounter2}>{notify[1]}</div> : null}
        </div>
        <div className={value === "agente" ? styles.boxSelected : styles.box} onClick={(e) => onChange(e, "agente")}>
          {"Agente"}
          {notify[2] ? <div className={styles.messageCounter3}>{notify[2]}</div> : null}
        </div>
        <div className={value === "cliente" ? styles.boxSelected : styles.box} onClick={(e) => onChange(e, "cliente")}>
          {"Cliente"}
          {notify[3] ? <div className={styles.messageCounter4}>{notify[3]}</div> : null}
        </div>
      </div>
    );
  }
}

export default ChatButtonsFilter;
