import React, { PureComponent } from "react";
import ReactTable from "react-table-6";
import Styles from "./styles.module.css";

export default class CustomTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
  }

  getTrProps = (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e) => {
          this.setState(
            {
              selected: rowInfo.index,
            },
            () => {
              this.props.handleSelection ? this.props.handleSelection(e, rowInfo.row) : (function () {})();
            }
          );
        },
        onClick: (e) => {
          this.setState(
            {
              selected: rowInfo.index,
            },
            () => {
              this.props.handleClick ? this.props.handleClick(e, rowInfo.row) : (function () {})();
            }
          );
        },
        style: {
          background: rowInfo.index === this.state.selected ? "grey" : rowInfo.index % 2 === 0 ? "#e2e2e2" : "transparent",
          color: rowInfo.index === this.state.selected ? "white" : "black",
        },
      };
    } else {
      return {};
    }
  };

  render() {
    const { data, columns, defaultPageSize } = this.props;
    return (
      <div className={Styles.container}>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={defaultPageSize}
          getTrProps={this.getTrProps}
          width={"auto"}
          style={{
            fontSize: "14px",
            backgroundColor: "#fff",
          }}
        />
      </div>
    );
  }
}
