import React, { Component } from "react";
import {
  Collapse,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import { connect } from "react-redux";
import { setGameDate } from "../actions/gameAction";

class DashboardNav extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
      dayString: null,
      isOpen: false,
      selectOpen: false,
      dropdownOpen: false
    };
  }

  componentDidMount() {
    let date = new Date(Date.now());
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let today = year + "-" + month + "-" + dt;
    console.log(today);
  }

  async handleDayClick(day, { selected }) {
    console.log(day);
    let year = day.getYear().toString();
    let month = day.getMonth() + 1;
    let dt = day.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    year = year.substring(1, 3);
    let newDate = month + "/" + dt + "/" + year;
    console.log(newDate);

    this.setState({
      selectedDay: selected ? undefined : day,
      dayString: newDate
    });
    await setGameDate(newDate);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleSelect = () => {
    this.setState({ selectOpen: !this.state.selectOpen });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">NBA Box Scores</NavbarBrand>
            <NavItem style={{ listStyle: "none" }}>
              <ButtonDropdown
                isOpen={this.state.selectOpen}
                toggle={this.toggleSelect}
              >
                <DropdownToggle caret>
                  {this.state.selectedDay === null
                    ? "Select Date"
                    : this.state.dayString}{" "}
                </DropdownToggle>
                <DropdownMenu>
                  <DayPicker
                    selectedDays={this.state.selectedDay}
                    onDayClick={this.handleDayClick}
                  />
                  <p style={{ textAlign: "center" }}>
                    {this.state.selectedDay
                      ? this.state.selectedDay.toLocaleDateString()
                      : "Please select a day 👻"}
                  </p>
                </DropdownMenu>
              </ButtonDropdown>
            </NavItem>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Link</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameDate: state.game.gameDate
});

export default connect(mapStateToProps, { setGameDate })(DashboardNav);
