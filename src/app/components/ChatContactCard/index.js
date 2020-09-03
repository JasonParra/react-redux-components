import React, { PureComponent } from "react";
import Styles from "./styles.module.css";
import CustomHeader from "../CustomHeader";
import CustomLabel from "../CustomLabel";

class ChatContactCard extends PureComponent {

  render() {
    const { value, data, className, onChange } = this.props;

    return (
      <div className={`${Styles.container} ${className}`}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`${Styles.card} 
          ${item.id === value ? Styles.selected : Styles.noSelected}`}
              onClick={(e) => onChange(e, item.id)}>
              <div className={Styles.left}>
                <div className={Styles.avatar}>{item.acronym}</div>
                <div className={Styles.messageContent}>
                  <div className={Styles.name}>
                    <CustomHeader as="h6">{item.name}</CustomHeader>
                  </div>
                  <div className={Styles.message}>{item.message}</div>
                  <div
                    style={{
                      color:
                        item.type === "all"
                          ? "#3498db"
                          : item.type === "entrada"
                            ? "#3498db"
                            : item.type === "agente"
                              ? "#f1c40f"
                              : item.type === "cliente"
                                ? "#2ecc71"
                                : "",
                    }}>
                    <CustomHeader as="h7">
                      {item.type === "all"
                        ? "Todos"
                        : item.type === "entrada"
                          ? "Entrada"
                          : item.type === "agente"
                            ? "Agente"
                            : item.type === "cliente"
                              ? "Cliente"
                              : ""}
                    </CustomHeader>
                  </div>
                </div>
              </div>
              <div className={Styles.right}>
                <CustomLabel as="h7">{item.date}</CustomLabel>
                {item.counter ? <div className={Styles.messageCounter}>{item.counter}</div> : <div></div>}
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChatContactCard;
