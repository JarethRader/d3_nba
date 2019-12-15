import React, { Component } from "react";
import { connect } from "react-redux";
import "./graph.css";

export class GamePointsBarGraph extends Component {
  state = {
    allPts: []
  };

  renderLines() {
    const { boxScoreSummary } = this.props.game;

    let awayTtlPts =
      boxScoreSummary.q1AwayPts +
      boxScoreSummary.q2AwayPts +
      boxScoreSummary.q3AwayPts +
      boxScoreSummary.q4AwayPts;

    let homeTtlPts =
      boxScoreSummary.q1HomePts +
      boxScoreSummary.q2HomePts +
      boxScoreSummary.q3HomePts +
      boxScoreSummary.q4HomePts;

    let highPts = Math.ceil(Math.max(awayTtlPts, homeTtlPts) / 10);

    return Array(highPts)
      .fill(null)
      .map((el, i) => <Line left={(100 / highPts) * i + 8.5} key={i} />);
  }

  renderBars() {
    const { boxScoreSummary } = this.props.game;

    let awayTtlPts =
      boxScoreSummary.q1AwayPts +
      boxScoreSummary.q2AwayPts +
      boxScoreSummary.q3AwayPts +
      boxScoreSummary.q4AwayPts;

    let homeTtlPts =
      boxScoreSummary.q1HomePts +
      boxScoreSummary.q2HomePts +
      boxScoreSummary.q3HomePts +
      boxScoreSummary.q4HomePts;

    let highPts = Math.ceil(Math.max(awayTtlPts, homeTtlPts) / 10);

    let allPts = [
      {
        team: boxScoreSummary.awayTeamAbr,
        ttlPts: awayTtlPts
      },
      {
        team: boxScoreSummary.homeTeamAbr,
        ttlPts: homeTtlPts
      }
    ];

    return allPts.map(pts => {
      const percent = (pts.ttlPts / highPts) * 10;
      return <Bar percent={percent} key={pts.team} />;
    });
  }

  render() {
    const { boxScoreSummary } = this.props.game;

    let awayTtlPts =
      boxScoreSummary.q1AwayPts +
      boxScoreSummary.q2AwayPts +
      boxScoreSummary.q3AwayPts +
      boxScoreSummary.q4AwayPts;

    let homeTtlPts =
      boxScoreSummary.q1HomePts +
      boxScoreSummary.q2HomePts +
      boxScoreSummary.q3HomePts +
      boxScoreSummary.q4HomePts;

    let allPts = [
      {
        team: boxScoreSummary.awayTeamAbr,
        ttlPts: awayTtlPts
      },
      {
        team: boxScoreSummary.homeTeamAbr,
        ttlPts: homeTtlPts
      }
    ];

    let highPts = Math.ceil(Math.max(awayTtlPts, homeTtlPts) / 10);

    return (
      <div className="graph-wrapper">
        <h2>
          {this.props.game.boxScoreSummary.awayTeam +
            " vs. " +
            this.props.game.boxScoreSummary.homeTeam}
        </h2>
        <h3>Total Points Scored</h3>

        <div className="graph">
          <BarTextContent pts={allPts} />

          <div className="bar-lines-container">
            {this.renderLines()}
            {this.renderBars()}
          </div>

          <div style={{ width: "12%" }} />
          <Markers pts={highPts + 1} />
        </div>
      </div>
    );
  }
}

const Markers = pts => {
  console.log(pts.pts);
  const markerArr = Array(pts.pts).fill(null);
  return (
    <div className="markers">
      {markerArr.map((el, i) => (
        <span
          className="marker"
          style={{ left: `${(100 / pts.pts) * i + 5}%` }}
        >
          {i * pts.pts}
        </span>
      ))}
    </div>
  );
};

const Bar = ({ percent }) => {
  return <div className="bar" style={{ width: `${percent}%` }} />;
};

const BarTextContent = ({ pts }) => {
  return (
    <div className="bar-text-content">
      {pts.map(pts => (
        <div className="text">{pts.team}</div>
      ))}
    </div>
  );
};

const Line = ({ left }) => {
  return <div className="line" style={{ left: `${left}%` }} />;
};

const mapStateToProps = state => ({
  loading: state.gameStatsLoading,
  game: state.game.game
});

export default connect(mapStateToProps, null)(GamePointsBarGraph);
