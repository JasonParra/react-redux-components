import React, { PureComponent } from 'react'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Styles from "./styles.module.css";

//Components
import CustomButtom from '../CustomButton'


class ErrorDialog extends PureComponent {

  render() {
    const { visible, text, handleDismiss } = this.props;
    const dictionary = {
      "Invalid Username or Password": "Usuario o Contraseña Invalidos",
      "El Usuario ya esta conectado": "El Usuario ya esta conectado"
    }
    return (
      <div className={`${visible ? Styles.modalOpen : Styles.modalClose}`}>
        <div className={Styles.card} style={{ width: 'auto' }}>
          <div className={Styles.content}>{dictionary[text] || text}</div>
          <div className={Styles.action}>
            <CustomButtom
              fluid
              icon={faExclamationTriangle}
              text={'Olvidar'}
              negative
              onClick={() => handleDismiss()}>
            </CustomButtom>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorDialog;
