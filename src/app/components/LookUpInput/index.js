import React from "react";
import { connect } from "react-redux";

//styles
import Styles from "./styles.module.css";

import _ from "lodash";
import { moneyFormat, formatPhoneNumber } from "../../utils/formats";
import CustomInput from "../CustomInput";
import CustomButtom from "../CustomButton";
import CustomModal from "../CustomModal";
import CustomTable from "../CustomTable";
import { faSearch, faCheck, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

class LookUpInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedItem: null,
      value: "",
      searchValue: "",
      error: false,
      activeItem: 0,
      data: [],
      usingAddCustomButtom: false,
      multipleMode: false,
      multipleCheckBoxValue: false,
      dataTable: [],
      update: true,
    };
    this.input = React.createRef();
    this.button = React.createRef();
  }

  componentDidMount = () => {
    this.setState(
      {
        data: _.sortBy(this.props.data, ["code"], ["asc"]) ? _.sortBy(this.props.data, ["code"], ["asc"]) : [],
        dummy: _.sortBy(this.props.data, ["code"], ["asc"]) ? _.sortBy(this.props.data, ["code"], ["asc"]) : [],
        dictionary: {
          name: "Nombre",
          lastName: "Apellido",
          age: "Edad",
          route: "Ruta",
          delivery: "Mensajero",
          order: "Pedido",
          seller: "Vendedor",
          date: "Fecha",
          client: "Cliente",
          amount: "Monto",
          lapsedtime: "Transcurrido",
          personalId: "Cédula",
          sector: "Sector",
          cedula: "Cédula",
          refDelivery: "Ref. Mens.",
          refSeller: "Ref. Vend.",
          phone: "Teléfono",
          code: "Código",
          payType: "Tipo",
          quantity: "Cantidad",
          payBack: "Vuelto",
          price: "Precio",
          detail: "Detalle",
        },
        dataTable: this.props.dataTable ? this.props.dataTable : [],
      },
      () => {
        this.props.defaultValue ? this.props.onChange({ target: { name: this.props.name, value: this.props.defaultValue } }) : this.void();
        if (this.props.data) {
          let obj = {};
          this.props.data.forEach((item, index) => {
            obj = { ...obj, ["inputQuantity" + item.id]: 1 };
          });
          this.setState({
            ...obj,
          });
        }
      }
    );
  };

  handleTable = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick ? this.props.onClick(e) : this.void();
    this.setState(
      {
        open: !this.state.open,
        data: _.sortBy(this.props.data, ["code"], ["asc"]),
        value: "",
        activeItem: 0,
        selectedItem: null,
        searchValue: "",
        ...this.state.data
          .map((item) => {
            return { ["checkbox" + item.id]: false };
          })
          .reduce((r, c) => Object.assign(r, c), {}),
        multipleCheckBoxValue: false,
      },
      () => {
        // if (!this.state.open) {
        //   this.props.myRef ? this.props.handleKeyDownSpecific(this.props.name) : this.input.current ? this.input.current.focus() : this.void()
        // } else this.input.current.focus();
      }
    );
  };

  filterByColumnName = (name) => {
    const { data } = this.state;
    if (name !== "Vacío" && name !== "selection" && name !== "detail") {
      this.setState(
        {
          filteredName: name,
          filterMode: data.length
            ? Object.keys(data[0]).map((item) => {
              return { [item]: "asc" };
            })
            : [],
        },
        () => {
          this.setState(
            {
              filterMode: this.state.filterMode.map((item) => (item[name] === "asc" ? { [name]: "desc" } : { [Object.keys(item)[0]]: "asc" })),
            },
            () => {
              if (_.isEqual(data, _.orderBy(data, name, this.state.filterMode.filter((item) => Object.keys(item)[0] === name)[0][name]))) {
                this.setState(
                  {
                    filterMode: this.state.filterMode.map((item) => (item[name] === "asc" ? { [name]: "desc" } : { [Object.keys(item)[0]]: "asc" })),
                  },
                  () => {
                    this.setState({
                      data: _.orderBy(data, name, this.state.filterMode.filter((item) => Object.keys(item)[0] === name)[0][name]),
                      update: false,
                    });
                  }
                );
              } else {
                this.setState({
                  data: _.orderBy(data, name, this.state.filterMode.filter((item) => Object.keys(item)[0] === name)[0][name]),
                  update: false,
                });
              }
            }
          );
        }
      );
    }
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === "searchValue") this.onTableSearch();
        else if (name.includes("inputQuantity")) {
          const data = this.props.dataTable.map((item, index) => {
            return {
              ...item,
              quantity: parseInt(name.replace("inputQuantity", "")) === parseInt(item.id) ? parseInt(value) : item.quantity || 0,
              amount: parseInt(item.price) * parseInt(value),
            };
          });
          this.props.handleDataTable(data);
        }
      }
    );
  };

  handleClick = (e, item, index) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        selectedItem: item,
      },
      () => {
        // this.input.current.focus();
      }
    );
  };

  handleDoubleClick = (e, item) => {
    e.stopPropagation();
    this.setState(
      {
        open: !this.state.open,
        data: this.state.dummy,
        searchValue: "",
        activeItem: this.state.data.indexOf(item),
        dataTable: [...this.state.dataTable, item],
      },
      async () => {
        await this.props.handleSelection(this.props.name, item);
        this.props.handleKeyDown ? this.props.handleKeyDown(this.props.name) : this.void();
        this.setState({
          selectedItem: null,
          activeItem: 0,
          searchValue: "",
          error: false,
        });
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        open: !this.state.open,
        searchValue: "",
        dataTable: this.props.multiple
          ? [...this.state.dataTable, ...this.state.data.filter((item) => item.selection === true)]
          : [...this.state.dataTable, this.state.selectedItem],
      },
      async () => {
        await this.props.handleSelection(
          this.props.name,
          this.state.data.filter((item) => item.selection).length ? this.state.data.filter((item) => item.selection) : this.state.selectedItem
        );
        this.props.handleKeyDown && !this.state.multipleMode ? await this.props.handleKeyDown(this.props.name) : this.void();
        this.setState({
          data: this.state.dummy,
          selectedItem: null,
          activeItem: 0,
          searchValue: "",
          error: false,
        });
      }
    );
  };

  searchOnInput = (inputValue) => {
    const filtered = _.filter(this.props.data, (item) => {
      let obj = {};
      for (let key of Object.keys(item)) {
        obj[key] = item[key];
      }
      if (Number.isInteger(parseInt(inputValue))) {
        if (inputValue.trim() == item.code) return true;
      } else {
        for (let key of Object.keys(obj)) {
          let value = obj[key];
          let re = new RegExp("W*(" + inputValue + ")W*");
          if (re.test(value ? value.toString().toLowerCase() : value)) {
            return true;
          } else if (re.test(value ? value : value)) {
            return true;
          } else if (inputValue.toString().trim().split(" ").length > 0) {
            let wordsKeyboard = inputValue.toString().trim().split(" ");
            let valueWords = value.toString().trim().split(" ");
            let matchedWoords = 0;
            wordsKeyboard.forEach((item, index) => {
              let re = new RegExp("W*(" + item + ")W*");
              if (re.test(valueWords[index] ? valueWords[index].toString().toLowerCase() : valueWords[index])) matchedWoords++;
              else if (re.test(valueWords[index] ? valueWords[index] : valueWords[index])) matchedWoords++;
            });
            if (matchedWoords === wordsKeyboard.length) return true;
          }
        }
      }
    });
    return filtered;
  };

  onTableSearch = () => {
    const filtered = _.filter(this.props.data, (item) => {
      let obj = {};
      for (let key of Object.keys(item)) {
        obj[key] = item[key];
      }
      if (Number.isInteger(parseInt(this.state.searchValue))) {
        if (this.state.searchValue.trim() == item.code) return true;
      }
      for (let key of Object.keys(obj)) {
        let value = obj[key];
        let re = new RegExp("W*(" + this.state.searchValue + ")W*");
        if (re.test(value ? value.toString().toLowerCase() : value)) {
          return true;
        } else if (re.test(value)) {
          return true;
        } else if (this.state.searchValue.toString().trim().split(" ").length > 0) {
          let wordsKeyboard = this.state.searchValue.toString().trim().split(" ");
          let valueWords = value.toString().trim().split(" ");
          let matchedWoords = 0;
          wordsKeyboard.forEach((item, index) => {
            let re = new RegExp("W*(" + item + ")W*");
            if (re.test(valueWords[index] ? valueWords[index].toString().toLowerCase() : valueWords[index])) matchedWoords++;
            else if (re.test(valueWords[index] ? valueWords[index] : valueWords[index])) matchedWoords++;
          });
          if (matchedWoords === wordsKeyboard.length) return true;
        }
      }
    });
    this.setState(
      {
        data:
          filtered.length === 1 && this.props.multiple
            ? filtered.map((item) => {
              return { ...item, selection: !item.selection };
            })
            : filtered,
        selectedItem: filtered.length === 1 ? filtered[0] : {},
        update: false,
      },
      () => {
        if (this.state.selectedItem)
          if (filtered.length > 1) {
            this.setState({
              selectedItem: filtered[0],
              activeItem: this.state.data.indexOf(filtered[0]),
            });
          } else if (filtered.length === 1) {
            if (this.props.multiple)
              this.setState({
                ["checkbox" + filtered[0].id]: true,
              });
          } else if (filtered.length > 1)
            this.setState({
              ...filtered
                .map((item) => {
                  return { ["checkbox" + item.id]: false };
                })
                .reduce((r, c) => Object.assign(r, c), {}),
            });
      }
    );
  };

  handleCheckboxChange = (e, value, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        [value.name]: value.checked,
      },
      () => {
        if (id)
          this.setState(
            {
              data: this.state.data.map((item) => {
                return {
                  ...item,
                  selection: item.id === id ? !item.selection : item.selection,
                };
              }),
            },
            () => {
              this.setState({
                multipleMode: this.state.data.filter((item) => item.selection === true).length > 1,
              });
            }
          );
        else {
          this.setState({
            data: this.state.data.map((item) => {
              return { ...item, selection: !this.state.selection };
            }),
            ...this.state.data
              .map((item) => {
                return { ["checkbox" + item.id]: !this.state.multipleCheckBoxValue };
              })
              .reduce((r, c) => Object.assign(r, c), {}),
            multipleCheckBoxValue: !this.state.multipleCheckBoxValue,
          });
        }
      }
    );
  };

  // renderRows = data => {
  //   const rows = data.map((item, index) => {
  //     return (
  //       <Table.Row
  //         key={index}
  //         className={_.isEqual(this.state.selectedItem || {}, item) || this.state['checkbox' + item.id] ? Styles.activeRow : null}
  //         onClick={e => this.handleClick(e, item, index)}
  //         onDoubleClick={e => this.handleDoubleClick(e, item)}
  //       >
  //         {Object.keys(data[0]).map((item2, index) => {
  //           if (item2 !== 'id')
  //             if (item2 === 'selection')
  //               return <Table.Cell className={Styles.cell} key={index}>
  //                 {
  //                   <Checkbox
  //                     defaultValue={item[item2]}
  //                     name={'checkbox' + item.id}
  //                     checked={this.state['checkbox' + item.id]}
  //                     onChange={(e, value) => this.handleCheckboxChange(e, value, item.id)}
  //                   />
  //                 }</Table.Cell>;
  //             else if (item2 === 'amount' || item2 === 'payBack' || item2 === 'price')
  //               return <Table.Cell className={Styles.cell} key={index}>
  //                 {moneyFormat(item[item2])}</Table.Cell>
  //             else if (item2 === 'phone')
  //               return <Table.Cell className={Styles.cell} key={index}>
  //                 {formatPhoneNumber(item[item2])}</Table.Cell>
  //             else if (item2 === 'detail')
  //               return <Table.Cell className={Styles.cell} key={index}>
  //                 <CustomButtom
  //                   color={'blue'}
  //                   size={'tiny'}
  //                   content="Ver Detalle"
  //                   onClick={() => this.handleOrderDetail(item.id)}
  //                   className={Styles.detailCustomButtom}>
  //                 </CustomButtom>
  //               </Table.Cell>
  //             else return <Table.Cell className={Styles.cell} key={index}>
  //               {item[item2]}
  //             </Table.Cell>;
  //         })}
  //       </Table.Row>
  //     );
  //   });
  //   return rows;
  // };

  // renderHeaderCell = data => {
  //   const header = data.length ? Object.keys(data[0]).map((item, index) => {
  //     if (item !== 'id') {
  //       if (item === 'selection')
  //         return <Table.HeaderCell key={index} onClick={() => this.filterByColumnName(item)}>
  //           <Checkbox
  //             name={'checkbox'}
  //             onChange={(e, value) => this.handleCheckboxChange(e, value, null)} />
  //         </Table.HeaderCell>
  //       return (<Table.HeaderCell key={index} onClick={() => this.filterByColumnName(item)}>
  //         <div className={this.state.filteredName === item ? Styles.filtered : Styles.normal}>
  //           {this.state.dictionary[item] ? this.state.dictionary[item] : item}
  //         </div>
  //       </Table.HeaderCell>);
  //     }
  //   }) : null;
  //   return header;
  // };

  renderTable = () => {
    let data = [];
    if (this.props.multiple) {
      if (this.props.dataTable) {
        data = this.state.data
          .map((item) => {
            return { selection: false, ...item };
          })
          .filter((item) => !this.props.dataTable.map((item2) => item2.name).includes(item.name));
      } else
        data = this.state.data.map((item) => {
          return { selection: false, ...item };
        });
    } else {
      data = this.state.data;
    }
    if (this.props.orderDetail) {
      data = data.map((item) => {
        return {
          ...item,
          detail: true,
        };
      });
    }
    return (
      <div className={Styles.table}>
        <CustomTable
          data={this.props.data}
          columns={this.props.columns}
          handleSelection={this.handleDoubleClick}
          handleClick={this.handleClick}
          defaultPageSize={10}></CustomTable>
      </div>
    );
  };

  sendDataUsingArrowsKeys = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await this.props.handleSelection(this.props.name, this.state.selectedItem);
    if (this.props.form) {
      this.setState(
        {
          error: false,
          open: false,
          activeItem: 0,
        },
        async () => {
          await this.props.handleKeyDown(this.props.name);
        }
      );
    } else {
      this.setState(
        {
          error: false,
          open: false,
          activeItem: 0,
        },
        () => {
          this.props.myRef ? this.props.handleKeyDownSpecific(this.props.name) : this.input.current ? this.input.current.focus() : this.void();
        }
      );
    }
  };

  sendData = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let selectedItem = this.searchOnInput(this.props.value.trim().match(/^\d+$/) ? this.props.value.trim() : this.props.value)[0];
    await this.props.handleSelection(this.props.name, selectedItem);
    this.setState(
      {
        dataTable: [...this.state.dataTable, selectedItem],
      },
      () => {
        if (!this.props.inputError) {
          this.props.handleKeyDown ? this.props.handleKeyDown(this.props.name) : this.void();
          this.setState({
            error: false,
            activeItem: 0,
          });
        }
      }
    );
  };

  void = () => { };

  handleDownKey = (e, usingAddCustomButtom) => {
    if (e.key === "Enter" && this.state.open) {
      console.log(this.state.data, this.state.activeItem);
      this.sendDataUsingArrowsKeys(e);
      usingAddCustomButtom ? this.props.handleEnterEvent() : this.void();
    } else if (e.key === "Enter") {
      ///Cadena Vacia
      if (this.props.value === "") {
        usingAddCustomButtom ? this.props.handleEnterEvent() : this.void();
        this.props.handleKeyDown ? this.props.handleKeyDown(this.props.name) : this.void();
        return;
        ///Cadena Numerica
      } else if (this.props.value ? this.props.value.trim().match(/^\d+$/) : "") {
        usingAddCustomButtom ? this.props.handleEnterEvent() : this.void();
        if (this.searchOnInput(this.props.value.trim()).length === 1) {
          this.sendData(e);
        } else if (this.searchOnInput(this.props.value.trim()).length > 1) {
          if (this.searchOnInput(this.props.value.trim()).filter((item) => item.code === this.props.value.trim()).length === 1) {
            this.sendData(e);
          } else {
            return this.setState(
              {
                open: !this.state.open,
                searchValue: this.props.value,
                error: false,
              },
              () => {
                this.onTableSearch();
                this.input.current ? this.input.current.focus() : this.void();
              }
            );
          }
        } else {
          return this.setState({
            error: true,
          });
        }
        ///Cadena Textual
      } else if (this.props.value ? this.props.value.match(/^[a-zA-Z0-9 ]*$/) : "") {
        usingAddCustomButtom ? this.props.handleEnterEvent() : this.void();
        if (this.searchOnInput(this.props.value).length > 1) {
          return this.setState(
            {
              open: !this.state.open,
              searchValue: this.props.value,
              error: false,
            },
            () => {
              this.onTableSearch();
              this.input.current ? this.input.current.focus() : this.void();
            }
          );
        } else if (this.searchOnInput(this.props.value).length === 1) {
          this.sendData(e);
        } else {
          return this.setState({
            error: true,
          });
        }
      }
    } else if (e.key === "Escape") {
      this.setState(
        {
          open: false,
        },
        () => {
          this.props.myRef ? this.props.handleKeyDownSpecific(this.props.name) : this.input.current ? this.input.current.focus() : this.void();
        }
      );
    } else if (e.key === "ArrowDown") {
      this.setState(
        {
          activeItem: this.state.activeItem + 1 > this.state.data.length - 1 ? 0 : this.state.activeItem + 1,
        },
        () => {
          this.setState({
            selectedItem: this.state.data[this.state.activeItem],
          });
        }
      );
    } else if (e.key === "ArrowUp") {
      this.setState(
        {
          activeItem: this.state.activeItem - 1 < 0 ? this.state.data.length - 1 : this.state.activeItem - 1,
        },
        () => {
          this.setState({
            selectedItem: this.state.data[this.state.activeItem],
          });
        }
      );
    }
  };

  closeLookUp = () => {
    this.setState(
      {
        open: !this.state.open,
        data: _.sortBy(this.props.data, ["code"], ["asc"]),
        value: "",
        activeItem: 0,
        selectedItem: null,
        searchValue: "",
        ...this.state.data
          .map((item) => {
            return { ["checkbox" + item.id]: false };
          })
          .reduce((r, c) => Object.assign(r, c), {}),
        multipleCheckBoxValue: false,
      },
      () => {
        if (!this.state.open) {
          this.props.myRef ? this.props.handleKeyDownSpecific(this.props.name) : this.input.current ? this.input.current.focus() : this.void();
        } else this.input.current.focus();
      }
    );
  };

  componentDidUpdate = () => {
    if (this.props.enterEvent) {
      this.handleDownKey(
        new KeyboardEvent("keypress", {
          code: "Enter",
          key: "Enter",
          charKode: 13,
          keyCode: 13,
        }),
        true
      );
    }
    const dataProps = this.props.multiple
      ? _.sortBy(
        this.props.data.map((item) => {
          return {
            ...item,
            selection: this.state["checkbox" + item.id],
          };
        }),
        ["name"]
      )
      : _.sortBy(this.props.data, ["name"]);
    const dataState = _.sortBy(this.state.data, ["name"]);

    if (!_.isEqual(dataProps, dataState, true) && this.state.update) {
      this.setState({
        data: this.props.data ? dataProps : [],
        dummy: this.props.data ? dataState : [],
        update: true,
      });
    }
    if (this.props.dataTable)
      if (!_.isEqual(this.props.dataTable, this.state.dataTable, true) && Array.isArray(this.props.dataTable)) {
        this.setState({
          dataTable: this.props.dataTable,
        });
        let obj = {};
        this.props.dataTable.forEach((item) => {
          obj = { ...obj, ["inputQuantity" + item.id]: item.quantity || 1 };
        });
        this.setState({
          ...obj,
        });
      }
    if (this.props.closeLookUp) {
      this.closeLookUp();
    }
  };

  onSubmitAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        open: !this.state.open,
        searchValue: "",
        dataTable: this.state.data,
      },
      async () => {
        await this.props.handleSelection(this.props.name, this.state.data);
        this.props.handleKeyDown && !this.state.multipleMode ? await this.props.handleKeyDown(this.props.name) : this.void();
        this.setState({
          data: this.state.dummy,
          selectedItem: {},
          activeItem: 0,
          searchValue: "",
          error: false,
        });
      }
    );
  };

  clearInput = (e) => {
    this.props.onChange({
      ...e,
      preventDefault: e.preventDefault,
      stopPropagation: e.stopPropagation,
      target: {
        name: this.props.name,
        value: "",
      },
    });
  };

  render() {
    const { data } = this.state;
    const { icon } = this.props
    return (
      <div>
        <CustomModal size={'medium'} open={this.state.open}>
          <CustomModal.Header icon={icon} handleModal={this.handleTable}>{this.props.title ? this.props.title : ""}</CustomModal.Header>
          <CustomModal.Content>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomInput
                placeholder={this.props.placeholder}
                autoComplete="off"
                icon={faSearch}
                name="searchValue"
                value={this.state.searchValue}
                onChange={this.handleInput}
                Ref={this.input}
                onKeyDown={this.handleDownKey}
              />
              {this.props.createItem ? (
                <CustomButtom
                  name={this.props.name}
                  icon={faPlus}
                  positive
                  content={this.props.createItem}
                  onClick={this.props.handleLookUpCreate}></CustomButtom>
              ) : (
                  <div></div>
                )}
            </div>
            {data.length ? this.renderTable() : <div className={Styles.emptyText}>{this.props.emptyText}</div>}
          </CustomModal.Content>
          <CustomModal.Action>
            {this.props.multiple ? (
              <div className={Styles.actionCustomButtoms}>
                <div className={Styles.actionsCustomButtomLeft}>
                  <CustomButtom icon={faTimes} text="Salir" onClick={this.handleTable}></CustomButtom>
                  <CustomButtom
                    positive
                    icon={faCheck}
                    text={this.props.buttonConfirmLabel ? this.props.buttonConfirmLabel : "Confirmar"}
                    onClick={this.onSubmit}
                    disabled={this.props.multiple ? !this.state.data.filter((item) => item.selection === true).length : !this.state.selectedItem}
                    Ref={this.button}
                  />
                </div>
                <CustomButtom
                  positive
                  icon={faCheck}
                  text={"Todos"}
                  onClick={this.onSubmitAll}
                  disabled={!this.state.data.length}
                  Ref={this.button}
                />
              </div>
            ) : (
                <div className={Styles.actionCustomButtoms}>
                  <CustomButtom icon={faTimes} text="Salir" onClick={this.handleTable}></CustomButtom>
                  <CustomButtom
                    positive
                    icon={faCheck}
                    text={this.props.buttonConfirmLabel ? this.props.buttonConfirmLabel : "Confirmar"}
                    onClick={this.onSubmit}
                    disabled={this.props.multiple ? !this.state.data.filter((item) => item.selection === true).length : !this.state.selectedItem}
                    Ref={this.button}
                  />
                </div>
              )}
          </CustomModal.Action>
        </CustomModal>
        <div className={Styles.input}>
          <CustomInput
            id={this.props.id}
            error={this.state.error}
            action={{ icon: faSearch, onClick: (e) => this.handleTable(e), disabled: this.props.disabled }}
            placeholder={this.props.placeholder}
            name={this.props.name ? this.props.name : ""}
            value={this.props.value ? this.props.value : ""}
            onChange={this.props.onChange}
            className={this.props.className}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            Ref={this.props.myRef ? this.props.myRef : this.input}
            type={this.props.type}
            disabled={this.props.disabled}
            autoComplete="off"
            style={this.props.style}
            size={this.props.size}
            fluid={this.props.fluid}
            icon={this.props.icon}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(LookUpInput);
