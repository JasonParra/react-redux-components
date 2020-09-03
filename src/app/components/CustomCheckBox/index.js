import React, { PureComponent } from 'react'
import CustomLabel from '../CustomLabel'
import Styles from './styles.module.css'


class CustomCheckBox extends PureComponent {

  render() {
    const { name, children, text, onChange, checked } = this.props

    return (
      <div>
        <label className={Styles.container}>
          <div className={Styles.containerCheckBox}>
            <input name={name} type="checkbox" checked={checked} onChange={onChange} className={Styles.checkmark} />
          </div>
          <div className={Styles.label}>
            <CustomLabel as="h6">{text || children}</CustomLabel>
          </div>
        </label>
      </div>
    )
  }
}

export default CustomCheckBox;


