import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

import { getGame, getDate, getGamesOfDay } from "../actions/gameAction";

import GamePointsBarGraph from "./gamePointsBarGraph";

export class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  handeGameSelect = async id => {
    console.log(id);
    await this.props.getGame(id);
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col lg="12">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>Select Game</DropdownToggle>
                <DropdownMenu>
                  {this.props.gameList.map(game => {
                    return (
                      <DropdownItem
                        onClick={() => this.handeGameSelect(game.game_id)}
                      >
                        {game.awayTeamAbr + " vs. " + game.homeTeamAbr}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              {this.props.game ? (
                <GamePointsBarGraph game={this.props.game} />
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.gameStatsLoading,
  game: state.game.game,
  games: state.game.gamesOfDate,
  gameList: state.game.gameList
});

export default connect(mapStateToProps, { getGame, getDate, getGamesOfDay })(
  DataDisplay
);
