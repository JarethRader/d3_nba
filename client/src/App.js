import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/appNavbar";
import ItemList from "./components/ItemList";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";

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
          <AppNavBar />
          <Container>
            <ItemModal />
            <ItemList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
