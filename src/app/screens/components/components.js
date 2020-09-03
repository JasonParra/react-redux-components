import React, { Component } from 'react'
import Styles from "./components.module.css"
import PasswordInput from "../../components/password-input/password-input"
import CustomButtom from '../../components/custom-button/custom-buttom';
import CustomInput from '../../components/custom-input/custom-input';
import { faUsers, faTimes, faList } from '@fortawesome/free-solid-svg-icons';
import CustomHeader from '../../components/custom-header/custom-header';
import CircularButton from '../../components/circular-button/circular-button';
import CustomLabel from '../../components/custom-label/custom-label'
import CustomDropdown from '../../components/custom-dropdown/custom-dropdown'

class Components extends Component {

  state = {
    input1: '',
    openDropdown: false
  }

  handleInputs = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  handleSlideButtons = (index) => {
    this.setState({
      activeSlideButton: index
    })
  }

  handleDropdown = () => {
    this.setState({
      openDropdown: !this.state.openDropdown
    })
  }

  render() {

    const { input1, input2, input3, input4, input5, openDropdown } = this.state

    return (
      <div className={Styles.container}>
        <div className={Styles.row}>
          <div className={Styles.column}>
            <CustomInput
              action={input1 ? {
                icon: faTimes,
                onClick: e => this.handleInputs({ ...e, target: { ...e.target, value: '', name: 'search' } })
              } : false}
              size={"mini"}
              value={input1}
              icon={faUsers}>
            </CustomInput>
            <CustomInput
              action={input2 ? {
                icon: faTimes,
                onClick: e => this.handleInputs({ ...e, target: { ...e.target, value: '', name: 'search' } })
              } : false}
              size={"small"}
              value={input2}
              icon={faUsers}>
            </CustomInput>
            <CustomInput size={"large"} icon={faUsers}></CustomInput>
            <CustomInput size={"big"} icon={faUsers}></CustomInput>
            <CustomInput size={"massive"} icon={faUsers}></CustomInput>
          </div>
          <div className={Styles.column}>
            <CustomButtom size="mini" positive>positive</CustomButtom>
            <CustomButtom size="small" negative>negative</CustomButtom>
            <CustomButtom size="large">press me</CustomButtom>
            <CustomButtom size="big">press me</CustomButtom>
            <CustomButtom size="massive">press me</CustomButtom>
          </div>
          <div className={Styles.column}>
            <CustomHeader as="h6">header 6</CustomHeader>
            <CustomHeader as="h5">header 5</CustomHeader>
            <CustomHeader as="h4">header 4</CustomHeader>
            <CustomHeader as="h3">header 3</CustomHeader>
            <CustomHeader as="h2">header 2</CustomHeader>
            <CustomHeader as="h1">header 1</CustomHeader>
          </div>
          <div className={Styles.column}>
            <CustomLabel as="h6">Label 6</CustomLabel>
            <CustomLabel as="h5">Label 5</CustomLabel>
            <CustomLabel as="h4">Label 4</CustomLabel>
            <CustomLabel as="h3">Label 3</CustomLabel>
            <CustomLabel as="h2">Label 2</CustomLabel>
            <CustomLabel as="h1">Label 1</CustomLabel>
          </div>
        </div>
        <div className={Styles.row}>
          <div className={Styles.column}>
            <div>
              <CustomButtom noBorder icon={faList} onClick={() => this.handleDropdown()}>Dropdown</CustomButtom>
              <CustomDropdown open={openDropdown} items={[{ text: 'item 1' }, { text: 'item 2' }, { text: 'item 3' }]}></CustomDropdown>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Components