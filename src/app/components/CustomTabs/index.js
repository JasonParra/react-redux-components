import React, { PureComponent } from "react";
import Styles from "./styles.module.css";
import CustomLabel from "../CustomLabel";

class CustomTabs extends PureComponent {
  state = {
    activeTab: 0,
  };

  handleView = (index, onClick) => {
    this.setState(
      {
        activeTab: index,
      },
      () => {
        onClick ? onClick() : (function () { })();
      }
    );
  };

  getTabs = () => {
    const { tabs, color, className } = this.props;
    const { activeTab } = this.state;
    return (
      <div className={`${className} ${Styles.containerTab}`}>
        {tabs.map((item, index) => {
          return (
            <div
              key={index}
              className={
                activeTab === index
                  ? color === "white"
                    ? Styles.tabWhiteActive
                    : Styles.tabBlackActive
                  : color === "white"
                    ? Styles.tabWhiteDisable
                    : Styles.tabBlackDisable
              }
              onClick={() => this.handleView(index, item.onClick)}>
              {item.icon ? <div className={activeTab === index ? Styles.activeIcon : Styles.disableIcon}>{item.icon || ""}</div> : ""}
              <div
                key={index}
                className={
                  activeTab === index
                    ? color === "white"
                      ? Styles.tabTitleWhiteActive
                      : Styles.tabTitleBlackActive
                    : color === "white"
                      ? Styles.tabTitleWhiteDisable
                      : Styles.tabTitleBlackDisable
                }>
                <CustomLabel as="h7">{item.name}</CustomLabel>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  getViews = () => {
    const { tabs } = this.props;
    const { activeTab } = this.state;
    return tabs
      .filter((item) => item.view)
      .map((item) => {
        return { view: item.view };
      })
      .map((item, index) => {
        return (
          <div className={Styles.containerView} key={index}>
            <div className={activeTab === index ? Styles.activeView : Styles.disableView}>{item.view}</div>
          </div>
        );
      });
  };

  render() {
    return (
      <div>
        {this.getTabs()}
        {this.getViews()}
      </div>
    );
  }
}

export default CustomTabs