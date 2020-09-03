import React, { PureComponent } from "react";
import Styles from "./styles.module.css";

class CustomLabel extends PureComponent {

  getHeader = (as) => {
    const { text, children } = this.props;
    switch (as) {
      case "h1":
        return <h1 className={Styles.h1}>{text || children}</h1>;
      case "h2":
        return <h2 className={Styles.h2}>{text || children}</h2>;
      case "h3":
        return <h3 className={Styles.h3}>{text || children}</h3>;
      case "h4":
        return <h4 className={Styles.h4}>{text || children}</h4>;
      case "h5":
        return <h5 className={Styles.h5}>{text || children}</h5>;
      case "h6":
        return <h6 className={Styles.h6}>{text || children}</h6>;
      case "h7":
        return <h6 className={Styles.h7}>{text || children}</h6>;
      default:
        return <h3 className={Styles.h3}>{text || children}</h3>;
    }
  }


  render() {
    const { as } = this.props
    return (<div>{this.getHeader(as)}</div>)
  }
}

export default CustomLabel;