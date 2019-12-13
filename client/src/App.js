import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";

import DashboardNav from "./components/dashboardNav";
import DataDisplay from "./components/dataDisplay";

class App extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     open: true
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container>
            <DashboardNav />
            <DataDisplay />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
