import React from "react";

import Wheel from "./components/wheel";
import axios from "axios";

import "./styles.css";

export default class MainPage extends React.Component {
  // constructor() {
  //   super();
  //   this.places = [
  //     "Plastic Laddles (rice spoon)",
  //     "Plastic Laddles (Passoire Beignet)",
  //     "ASSIETTE GARBA(Fufu bowl)",
  //     "Double Bowl ",
  //     "Plate ",
  //     "Cup",
  //     "GARBA PLATE + COUV (Compartment Food Storage)",
  //     "CASSEROLE 3 L",
  //     "BASSINE FOOTED BOL 50",
  //   ];
  // }
  state = {
    won: [],
    left: [],
    // region:''
  };
  async componentDidMount() {
    let reg;
    let r = this.props.match.params.region;
    if (r.includes(" ")) {
      reg = r.replace(" ", "/");
    } else {
      reg = r;
    }
    try {
      const response = await axios.post("https://skrillergh.pythonanywhere.com/allpackages/", {
        region: reg,
      });
      const data = response.data;
      console.log(data);
      console.log(data.packages);

      this.setState({ left: [...data.left_packages] });

      // data.won_packages.forEach((element) => {
      this.setState({ won: [...data.won_packages] });
      // });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div className="App">
        <Wheel
          items={this.state.left}
          region={this.props.match.params.region}
          won={this.state.won}
          history={this.props.history}
        />
      </div>
    );
  }
}
