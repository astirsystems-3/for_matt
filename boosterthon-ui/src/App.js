import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFundraiser from "./components/add-fundraiser.component";
import Fundraiser from "./components/fundraiser.component";
import FundraisersList from "./components/fundraisers-list.component";

class App extends Component {
  render() {
    return (
      <div>
        {/** PAGE NAVIGATION MENU */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/fundraisers"} className="navbar-brand">
            BoosterThon Demo   
          </Link>

          {/* Top Navigation */}
          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/fundraisers"} className="nav-link">
                Show Fundraisers   
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Create New Fundraiser
              </Link>
            </li>
          </div>
        </nav>

        {/** Main Page Content */}
        <div className="container mt-3">
          <Switch>
            {/** Default Route */}
            <Route exact path={["/", "/fundraisers"]} component={FundraisersList} />
            {/** Create New Fundraiser */}
            <Route exact path="/add" component={AddFundraiser} />
            {/** Render Specific fundraiser by ID */}
            <Route path="/fundraisers/:id" component={Fundraiser} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
