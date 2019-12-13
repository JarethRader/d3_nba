import React, { Component } from "react";
import { Element } from "react-faux-dom";
import * as d3 from "d3";

export class GamePointsBarGraph extends Component {
  constructor(props) {
    super(props);
  }

  plot(chart, width, height) {
    try {
      const bs = this.props.game.boxScoreSummary;

      const data = [
        {
          team: bs.awayTeamAbr,
          Q1: bs.q1AwayPts,
          Q2: bs.q2AwayPts,
          Q3: bs.q3AwayPts,
          Q4: bs.q4AwayPts
        },
        {
          team: bs.homeTeamAbr,
          Q1: bs.q1HomePts,
          Q2: bs.q2HomePts,
          Q3: bs.q3HomePts,
          Q4: bs.q4HomePts
        }
      ];

      const xData = ["Q1", "Q2", "Q3", "Q4"];

      const awayTtlPts =
        bs.q1AwayPts + bs.q2AwayPts + bs.q3AwayPts + bs.q4AwayPts;
      const homeTtlPts =
        bs.q1homePts + bs.q2homePts + bs.q3homePts + bs.q4homePts;
    } catch (err) {
      console.log(err);
    }
  }

  drawChart() {
    const width = 800;
    const height = 450;

    const el = new Element("div");
    const svg = d3
      .select(el)
      .append("svg")
      .attr("id", "chart")
      .attr("width", width)
      .attr("height", height);

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    };

    const chart = svg
      .append("g")
      .classed("display", true)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
  }

  render() {
    return this.drawChart();
  }
}

export default GamePointsBarGraph;
