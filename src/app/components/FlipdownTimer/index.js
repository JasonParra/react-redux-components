import React, { PureComponent } from "react";
import "./styles.css";
import CustomLabel from "../CustomLabel";

export default class FlipdownTimer extends PureComponent {

  componentDidMount = () => {
    let seconds = 2;
    let minutes = 2;
    let hours = 2

    let secondsData = "<span class='count curr top flipTop'>" +
      -1 +
      "</span><span class='count next top'>" +
      0 +
      "</span><span class='count next bottom flipBottom'>" +
      0 +
      "</span><span class='count curr bottom'>" +
      0 +
      "</span>"
    let minutesData = "<span class='count curr top flipTop'>" +
      -1 +
      "</span><span class='count next top'>" +
      0 +
      "</span><span class='count next bottom flipBottom'>" +
      0 +
      "</span><span class='count curr bottom'>" +
      0 +
      "</span>"
    let hoursData = "<span class='count curr top flipTop'>" +
      -1 +
      "</span><span class='count next top'>" +
      0 +
      "</span><span class='count next bottom flipBottom'>" +
      0 +
      "</span><span class='count curr bottom'>" +
      0 +
      "</span>"

    document.getElementsByClassName("hours")[0].innerHTML = hoursData;
    document.getElementsByClassName("minutes")[0].innerHTML = minutesData;
    document.getElementsByClassName("seconds")[0].innerHTML = secondsData;


    setInterval(function () {
      let oldSeconds = seconds
      let oldMinutes = minutes
      let oldhours = hours

      if (minutes === 61 && seconds === 61) {
        let hoursUp = hours++, hoursDown = hoursUp--
        hoursData =
          "<span class='count curr top flipTop'>" +
          hoursDown +
          "</span><span class='count next top'>" +
          hoursUp +
          "</span><span class='count next bottom flipBottom'>" +
          hoursUp +
          "</span><span class='count curr bottom'>" +
          hoursUp +
          "</span>";
      }

      if (seconds === 61) {
        minutes = minutes === 61 ? 1 : minutes
        let minutesUp = minutes++, minutesDown = minutesUp--
        minutesData =
          "<span class='count curr top flipTop'>" +
          minutesDown +
          "</span><span class='count next top'>" +
          minutesUp +
          "</span><span class='count next bottom flipBottom'>" +
          minutesUp +
          "</span><span class='count curr bottom'>" +
          minutesUp +
          "</span>";
      }

      seconds = seconds === 61 ? 1 : seconds
      let secondsUp = seconds++, secondsDown = secondsUp--
      secondsData =
        "<span class='count curr top flipTop'>" +
        secondsDown +
        "</span><span class='count next top'>" +
        secondsUp +
        "</span><span class='count next bottom flipBottom'>" +
        secondsUp +
        "</span><span class='count curr bottom'>" +
        secondsUp +
        "</span>";

      if (document.getElementsByClassName("hours").length && oldhours !== hours)
        document.getElementsByClassName("hours")[0].innerHTML = hoursData;

      if (document.getElementsByClassName("minutes").length && oldMinutes !== minutes)
        document.getElementsByClassName("minutes")[0].innerHTML = minutesData;

      if (document.getElementsByClassName("seconds").length && oldSeconds !== seconds)
        document.getElementsByClassName("seconds")[0].innerHTML = secondsData;
    }, 1000);
  };

  render() {
    return (
      <div>
        <div className="container">
          <CustomLabel as="h4">{this.props.title}</CustomLabel>
        </div>
        <div className="info">
          <div className="number">
            <div className="hours">
              <span className="count top flipTop">2</span>
              <span className="count top">1</span>
              <span className="count bottom flipBottom">1</span>
              <span className="count bottom">2</span>
            </div>
            <div>
              <CustomLabel as={"h7"}>Horas</CustomLabel>
            </div>
          </div>
          <div className="doubleDots">:</div>
          <div className="number">
            <div className="minutes">
              <span className="count top flipTop">2</span>
              <span className="count top">1</span>
              <span className="count bottom flipBottom">1</span>
              <span className="count bottom">2</span>
            </div>
            <div>
              <CustomLabel as={"h7"}>Minutos</CustomLabel>
            </div>
          </div>
          <div className="doubleDots">:</div>
          <div className="number">
            <div className="seconds">
              <span className="count top flipTop">2</span>
              <span className="count top">1</span>
              <span className="count bottom flipBottom">1</span>
              <span className="count bottom">2</span>
            </div>
            <div>
              <CustomLabel as={"h7"}>Segundos</CustomLabel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
