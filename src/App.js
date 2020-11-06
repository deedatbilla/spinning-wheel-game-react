import React from "react";


import MainPage from "./MainPage";
import SuccessPage from './SuccessPage';
import SelectRegionPage from './components/SelectRegionPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

export default class App extends React.Component {
 

  render() {
    return (
    
       <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={SelectRegionPage} />
            <Route exact path="/wheel/:region" component={MainPage} />
            <Route exact path="/success/:item" component={SuccessPage} />
           
          </Switch>
        </div>
      </Router>

    );
  }
}

