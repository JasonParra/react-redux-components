import React, { Component } from 'react'
import logo from '../../../logo.svg'
import '../../../App.css'
import CustomHeader from '../../components/custom-header/custom-header'
import Styles from './home.module.css'
import CustomButtom from '../../components/custom-button/custom-buttom'
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className={Styles.container}>
        <div className={Styles.top}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className={Styles.title}>
            <CustomHeader as="h1">React + Redux + Components</CustomHeader>
          </div>
          <div className={Styles.title}>
            <CustomHeader as="h2">Examples</CustomHeader>
          </div>
        </div>
        <div className={Styles.examples}>
          <CustomButtom size={'medium'} onClick={() => this.props.history.push("/components")}>Components</CustomButtom>
          <CustomButtom size={'medium'}>Crude</CustomButtom>
          <CustomButtom size={'medium'}>App Example</CustomButtom>
        </div>
        <div></div>
      </div>
    )
  }
}

export default withRouter(Home)