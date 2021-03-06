import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import "./style.css";
import ServerErr from "./../../Errors/Err500/ServerErr";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import searchIcon from "../../../Images/search.png";

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      shownCardId: "",
      show: false,
      errorFound: false,
      showAvailableRooms: false,
      startDate: new Date(),
      endDate: new Date(),
      availableRooms: [],
      showForm: false,
    };
  }

  
  componentDidMount() {
    axios
      .get("/api/rooms")
      .then((res) => this.setState({ rooms: res.data }))
      .catch((err) => this.setState({ errorFound: !this.state.errorFound }));
  }

  //To show information of any room that user click on it
  showInfo = (id) => {
    this.setState((prevState) => ({
      shownCardId: id,
      show: !prevState.show,
    }));
  };

  //change date to the startdate that user select
  handleChange = (startTime) => {
    this.setState({
      startDate: startTime,
    });
  };
  //change date to the enddate that user select
  handleChangeend = (endTime) => {
    this.setState({
      endDate: endTime,
    });
  };

  //To search about rooms that will be available at the date user selected
  searchAvailableRooms = () => {
    const startTime = moment(this.state.startDate.toLocaleString()).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const endTime = moment(this.state.endDate.toLocaleString()).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    axios
      .get(`/api/available-rooms`, {
        params: {
          startTime: startTime,
          endTime: endTime,
        },
     
      })
      .then((res) =>
        this.setState({
          availableRooms: res.data.rows,
          showAvailableRooms: true,
        })
      )
      .catch((err) => this.setState({ errFound: !this.state.errFound }));
  };
  renderAvailableRooms() {
    let { availableRooms, startDate,endDate } = this.state
    localStorage.setItem('availableRooms', JSON.stringify(availableRooms))
    localStorage.setItem('startTime', startDate)
    localStorage.setItem('endTime', endDate)
    this.props.history.push('/rooms/available-rooms', {
      availableRooms: availableRooms, startTime: startDate,endTime: endDate })
  }
  render() {
    const { rooms, shownCardId, show, showAvailableRooms } = this.state;
    return this.state.errorFound ? (
      <ServerErr />
    ) : (
      <div>
        <div>
          <div className="available-rooms-container__search-bar">
            <div className="available-rooms-container__datepicker">
              <div className="available-rooms-container__datepicker1">
                <h3>Start Date</h3>
                <DatePicker
                  placeholderText="Enter Date"
                  className="available-rooms-container__date-picker"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  dateFormat="MM d, yyyy h:mm aa"
                  showTimeSelect
                  selectsStart
                  value={this.state.startDate}
                />
              </div>
              <div className="available-rooms-container__datepicker2">
                <h3>End Date</h3>
                <DatePicker
                  placeholderText="Enter Date"
                  className="available-rooms-container__date-picker"
                  selected={this.state.endDate}
                  onChange={this.handleChangeend}
                  dateFormat="MM d, yyyy h:mm aa"
                  showTimeSelect
                  selectsStart
                  value={this.state.endDate}
                />
              </div>
            </div>
            <img
              src={searchIcon}
              className="available-rooms-container__iconDiv__search"
              onClick={this.searchAvailableRooms}
              alt="search"
            />
          </div>
          {this.state.availableRooms.length > 0 ? (
            this.renderAvailableRooms()
          ) : (
            <p className="search_message">
              {" "}
              Enter Date to check available rooms{" "}
            </p>
          )}
        </div>
        <ul className="rooms">
          {!rooms.length ? (
            <div className="loading-spinner">
              <ClipLoader
                className="loading-spinner__home"
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
              />
            </div>
          ) : (
            rooms.map((rooms) => {
              return !showAvailableRooms ? (
                <div key={rooms.room_id} className="rooms__card">
                  <h2 onClick={() => this.showInfo(rooms.room_id)}>
                    {rooms.room_name}
                  </h2>
                  {rooms.room_id === shownCardId && show ? (
                    <div className="rooms__card__content">
                      <li className="room_info_li">
                        {" "}
                        capacity : {rooms.capacity}
                      </li>
                      <li className="room_info_li"> space : {rooms.space}</li>
                      <li className="room_info_li">
                        {" "}
                        {rooms.datashow ? "DataShow" : null}
                      </li>
                      <li className="room_info_li">
                        {" "}
                        {rooms.wifi ? "Wifi" : null}
                      </li>
                      <li className="room_info_li">
                        {rooms.coffee_bar ? "Coffee Bar" : null}
                      </li>
                      <li className="room_info_li">
                        {rooms.white_board ? "White Board " : null}
                      </li>
                    </div>
                  ) : null}
                </div>
              ) : null;
            })
          )}
        </ul>
      </div>
    );
  }
}

export default Rooms;
