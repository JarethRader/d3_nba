import React, { Component } from "react";
import "./route.css";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.7834345,
      lng: -73.9662495,
      zoom: 12
    };
  }

  componentDidMount() {
    window.scrollTo(0, 130);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="pageBody guide">
        <h1>Come Explore with us</h1>
        <hr className="my-2" />
        <br />
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}

export default Guide;
