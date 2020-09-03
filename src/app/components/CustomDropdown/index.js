import React, { PureComponent } from "react";
import Styles from "./styles.module.css";

class CustomDrodown extends PureComponent {

  render() {
    const { open, style, items, className } = this.props

    if (open)
      return (
        <div className={Styles.container}>
          <div className={`${Styles.list} ${className}`} style={style}>
            {items.map((item, index) => {
              return (
                <div key={index} className={Styles.item} onClick={item.onClick}>
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      );
    else return null;
  }
}
export default CustomDrodown