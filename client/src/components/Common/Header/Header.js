import React, { Component } from "react";
import GSGlog from "../../../Images/gsg_logo.jpg";
import Profile from "../../../Images/Ellipse 2.jpg";
import "./Header.css";
import { Link } from "react-router-dom";
import logout from "../../Layout/logout/logout";

// through withRouter You can get access to the history object’s properties
// withRouter will pass updated match,location, and history props to the wrapped component whenever it renders.

import { withRouter } from "react-router";
import axios from "axios";
import Login from "../../Layout/Login/Login";

class Header extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      email: "",
      userId: "",
      userName: "",
      success: false,
      open: false,
    };
  }

// We wire up click listeners on the document for mousedown. Then remove in our componentWillUnmount to properly cleanup our listeners.

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // We need to check to make sure that our current is actually filled in with a DOM element. Then using the DOM method contains we ask our container if we have the event.target which is the DOM element that was clicked.
  // If we don't have the clicked target then that means it's outside of our container and we need to close our menu. So we call setState and set open to false.
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };
  handleButtonClick = () => {
    axios.get("/api/check").then(({ data }) => {
      const { success } = data;

      this.setState((state) => {
        return {
          open: !state.open,
          success: success,
        };
      });
    });
  };

  redirectToHome = ()=> {
    const { history } = this.props
    axios.get('/api/check').then(({ data }) => {
      const { success, email, userId, userName } = data
      if (success) {
        this.setState({ email, userId, userName }, () => {
          history.push(`/home/${userId}`);
        });
      } else {
        return history.push("/login");
      }
    });
  };

  render() {
    const { userId } = this.state;
    return (
      <div className="header">
        <Link to={"/"} className="header_link">
          <img
            className="logo"
            src={GSGlog}
            alt="logo"
          />
        </Link>

        <div className="App">
          <div className="container" ref={this.container}>
            <button
              type="button"
              className="profile"
              class="button"
              onClick={this.handleButtonClick}
            >
              ☰
            </button>

            {this.state.open && (
              <div class="container">
                <ul className="ul">
                  <li onClick={this.redirectToHome}>
                    {this.state.success ? (
                      <div className="Home">
                        <p>Home</p>
                      </div>
                    ) : (
                      <p> Login </p>
                    )}{" "}
                  </li>
                  {this.state.success ? (
                    <li>
                      <div>
                        <p
                          onClick={() => {
                            logout();
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
