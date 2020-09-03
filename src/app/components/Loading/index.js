import React, { PureComponent } from 'react'
import Styles from './styles.module.css'

class Loading extends PureComponent {


  render() {
    const { isLoading } = this.props

    return isLoading ?
      <div className={Styles.container}>
        <div className={Styles.loader}>
        </div></div> : null
  }
}

export default Loading;