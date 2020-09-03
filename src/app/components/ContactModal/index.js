import React, { PureComponent } from "react";
import CustomInput from "../CustomInput";
import InputError from "../InputError";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import CustomHeader from "../CustomHeader";
import Styles from "./styles.module.css";
import { faUser, faIdCard, faTimes, faBirthdayCake, faPhone, faAt, faCheck, faBarcode, faMapMarkedAlt, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { editContact } from "../../redux/actions/contact";
import { isPhone, isMail, isPersonalId } from "../../utils/validator";
import _ from "lodash";
import { connect } from "react-redux";

class ContactModal extends PureComponent {
  state = {
    name: "",
    cedula: "",
    birthdate: "",
    phone: "",
    email: "",
    oldContact: {},
    system_code: "",
    system_name: "",
    system_phone: "",
    system_email: "",
    system_birthdate: "",
    system_address: "",
    system_note: "",
    error: false,
  };

  componentDidMount = () => {
    const { name, phone, email, birthdate, rnc, cedula } = this.props.contact;
    const contact = {
      name: name || "",
      phone: phone || "",
      email: email || "",
      birthdate: birthdate || "",
      rnc: rnc || "",
      cedula: cedula || "",
    };
    this.setState({
      ...contact,
      oldContact: contact,
    });
  };

  handleInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleModifyContact = () => {
    const error = this.validateContact();

    if (!error) {
      const { name, phone, email, birthdate, rnc, cedula } = this.state;
      const contact = {
        name,
        phone,
        email,
        birthdate,
        rnc,
        cedula,
      };
      this.props.handleContact(contact);
      this.setState(
        {
          oldContact: contact,
          error: false,
        },
        () => {
          const payload = {
            name,
            phone,
            email,
            birthday: birthdate,
            rnc,
            cedula,
          };
          this.props.dispatch(editContact(payload));
          this.props.handleContactModal();
        }
      );
    } else {
      this.setState({
        error,
      });
    }
  };

  disableModify = () => {
    const { name, phone, email, birthdate, rnc, cedula, oldContact, error } = this.state;
    const contact = {
      name,
      phone,
      email,
      birthdate,
      rnc,
      cedula,
    };

    return _.isEqual(contact, oldContact) || oldContact === null || (error ? this.validateContact() : false);
  };

  inputErrorMsg = (input) => {
    const { error } = this.state;

    if (error) {
      const { name, phone, email, birthdate, cedula } = this.state;
      let msg = "";

      switch (input) {
        case "name":
          msg = !name ? "Campo Vacío" : "";
          break;
        case "phone":
          msg = !phone ? "Campo Vacío" : !isPhone(phone) ? "Teléfono no Valido" : "";
          break;
        case "email":
          msg = !email ? "Campo Vacío" : !isMail(email) ? "Correo no Valido" : "";
          break;
        case "birthdate":
          msg = !birthdate ? "Campo Vacío" : "";
          break;
        case "cedula":
          msg = !cedula ? "Campo Vacío" : !isPersonalId(cedula) ? "Cédula no Valida" : "";
          break;
        default:
          msg = "";
      }

      return msg;
    } else return "";
  };

  validateContact = () => {
    const { name, phone, email, birthdate, cedula } = this.state;
    let error = false;

    if (!name) error = true;
    else if (!isPhone(phone) || !phone) error = true;
    else if (!isMail(email) || !email) error = true;
    else if (!birthdate) error = true;
    else if (!isPersonalId(cedula) || !cedula) error = true;

    return error;
  };

  render() {
    const { name, cedula, birthdate, phone, email, system_code, system_name, system_phone, system_address, system_note } = this.state;
    const { open } = this.props;

    return (
      <CustomModal open={open}>
        <CustomModal.Header icon={faUser} handleModal={this.props.handleContactModal}>
          Editar Contacto
        </CustomModal.Header>
        <CustomModal.Content>
          <CustomHeader as="h4">Contacto</CustomHeader>
          <CustomInput
            fluid
            className={Styles.marginTop}
            icon={faUser}
            iconPosition="left"
            placeholder="nombre"
            size="mini"
            name="name"
            onChange={this.handleInputs}
            value={name}
            action={
              name
                ? {
                  icon: faTimes,
                  onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "name" } }),
                }
                : false
            }
            error={this.inputErrorMsg("name")}
          />
          {this.inputErrorMsg("name") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("name")}</InputError> : null}
          <CustomInput
            fluid
            className={Styles.marginTop}
            icon={faIdCard}
            iconPosition="left"
            placeholder="cedula"
            size="mini"
            name="cedula"
            onChange={this.handleInputs}
            value={cedula}
            type={"number"}
            action={
              cedula
                ? {
                  icon: faTimes,
                  onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "cedula" } }),
                }
                : false
            }
            error={this.inputErrorMsg("cedula")}
          />
          {this.inputErrorMsg("cedula") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("cedula")}</InputError> : null}
          <CustomInput
            fluid
            className={Styles.marginTop}
            icon={faBirthdayCake}
            iconPosition="left"
            placeholder="cumpleaños"
            size="mini"
            name="birthdate"
            onChange={this.handleInputs}
            value={birthdate}
            action={
              birthdate
                ? {
                  icon: faTimes,
                  onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "birthdate" } }),
                }
                : false
            }
            error={this.inputErrorMsg("birthdate")}
          />
          {this.inputErrorMsg("birthdate") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("birthdate")}</InputError> : null}
          <CustomInput
            fluid
            className={Styles.marginTop}
            icon={faPhone}
            iconPosition="left"
            placeholder="numero"
            size="mini"
            name="phone"
            type={"number"}
            onChange={this.handleInputs}
            value={phone}
            action={
              phone
                ? {
                  icon: faTimes,
                  onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "phone" } }),
                }
                : false
            }
            error={this.inputErrorMsg("phone")}
          />
          {this.inputErrorMsg("phone") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("phone")}</InputError> : null}
          <CustomInput
            fluid
            className={Styles.marginTop}
            iconPosition="left"
            placeholder="correo"
            size="mini"
            name="email"
            icon={faAt}
            onChange={this.handleInputs}
            value={email}
            handleInputs={this.handleInputs}
            action={
              email
                ? {
                  icon: faTimes,
                  onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "email" } }),
                }
                : false
            }
            error={this.inputErrorMsg("email")}
          />
          {this.inputErrorMsg("email") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("email")}</InputError> : null}
          <div className={Styles.companyContainer}>
            <CustomHeader as="h4">Empresa</CustomHeader>
            <CustomInput
              fluid
              className={Styles.marginTop}
              icon={faBarcode}
              iconPosition="left"
              placeholder="código"
              size="mini"
              name="system_code"
              type={"number"}
              onChange={this.handleInputs}
              value={system_code}
              action={
                system_code
                  ? {
                    icon: faTimes,
                    onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "system_code" } }),
                  }
                  : false
              }
              error={this.inputErrorMsg("system_code")}
            />
            {this.inputErrorMsg("system_code") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("system_code")}</InputError> : null}
            <CustomInput
              fluid
              className={Styles.marginTop}
              icon={faUser}
              iconPosition="left"
              placeholder="nombre"
              size="mini"
              name="system_name"
              onChange={this.handleInputs}
              value={system_name}
              action={
                system_name
                  ? {
                    icon: faTimes,
                    onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "system_name" } }),
                  }
                  : false
              }
              error={this.inputErrorMsg("system_name")}
            />
            {this.inputErrorMsg("system_name") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("system_name")}</InputError> : null}
            <CustomInput
              fluid
              className={Styles.marginTop}
              icon={faPhone}
              iconPosition="left"
              placeholder="numero"
              size="mini"
              name="system_phone"
              type={"number"}
              onChange={this.handleInputs}
              value={system_phone}
              action={
                phone
                  ? {
                    icon: faTimes,
                    onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "system_phone" } }),
                  }
                  : false
              }
              error={this.inputErrorMsg("system_phone")}
            />
            {this.inputErrorMsg("system_phone") ? <InputError className={Styles.inputError}>{this.inputErrorMsg("system_phone")}</InputError> : null}
            <CustomInput
              fluid
              className={Styles.marginTop}
              icon={faMapMarkedAlt}
              iconPosition="left"
              placeholder="dirección"
              size="mini"
              name="system_address"
              onChange={this.handleInputs}
              value={system_address}
              action={
                system_address
                  ? {
                    icon: faTimes,
                    onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "system_address" } }),
                  }
                  : false
              }
            />
            <CustomInput
              fluid
              className={Styles.marginTop}
              icon={faStickyNote}
              iconPosition="left"
              placeholder="nota"
              size="mini"
              name="system_note"
              onChange={this.handleInputs}
              value={system_note}
              action={
                system_note
                  ? {
                    icon: faTimes,
                    onClick: (e) => this.handleInputs({ ...e, target: { ...e.target, value: "", name: "system_note" } }),
                  }
                  : false
              }
            />
          </div>
        </CustomModal.Content>
        <CustomModal.Action>
          <div className={Styles.actionsButtons}>
            <CustomButton icon={faTimes} onClick={this.props.handleContactModal}>
              Salir
            </CustomButton>
            <CustomButton icon={faCheck} onClick={() => this.handleModifyContact()} disabled={this.disableModify()} positive>
              Modificar
            </CustomButton>
          </div>
        </CustomModal.Action>
      </CustomModal>
    );
  }
}

export default connect()(ContactModal);
