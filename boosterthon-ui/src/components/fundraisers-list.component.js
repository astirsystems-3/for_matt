import React, { Component } from "react";
import FundraiserDataService from "../services/fundraiser.service";
import { Link } from "react-router-dom";

export default class FundraisersList extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchLabel = this.onChangeSearchLabel.bind(this);
    // this.retrieveFundraisers = this.retrieveFundraisers.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveFundraiser = this.setActiveFundraiser.bind(this);
    // this.removeAllFundraisers = this.removeAllFundraisers.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      fundraisers: [],
      currentFundraiser: null,
      currentIndex: -1,
      searchLabel: ""
    };
  }

  componentDidMount() {
    this.retrieveFundraisers();
  }

  onChangeSearchLabel = (e) =>{
    const searchLabel = e.target.value;

    this.setState({
      searchLabel: searchLabel
    });
  }

  retrieveFundraisers = () => {
    FundraiserDataService.getAll()
      .then(response => {
        this.setState({
          fundraisers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList = () => {
    this.retrieveFundraisers();
    this.setState({
      currentFundraiser: null,
      currentIndex: -1
    });
  }

  setActiveFundraiser = (fundraiser, index)=>  {
    this.setState({
      currentFundraiser: fundraiser,
      currentIndex: index
    });
  }

  removeAllFundraisers = () => {
    FundraiserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchLabel = () => {
    this.setState({
      currentFundraiser: null,
      currentIndex: -1
    });

    FundraiserDataService.findByLabel(this.state.searchLabel)
      .then(response => {
        this.setState({
          fundraisers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderFundPreview = () =>{
    return (
        <div>
          <h4>Fundraiser Preview</h4>
          {/** SELECTION PREVIEW  */}
          <div>
            <label>
              <strong>Label:</strong>
            </label>{" "}
            {this.state.currentFundraiser.fundlabel}
          </div>

          <div>
            <label>
              <strong>Reviewed By:</strong>
            </label>{" "}
            {this.state.currentFundraiser.reviewername}
          </div>

          <div>
            <label>
              <strong>Rating:</strong>
            </label>{" "}
            {this.state.currentFundraiser.rating}
          </div>

          <div>
            <label>
              <strong>Reviewed Date:</strong>
            </label>{" "}
            {this.state.currentFundraiser.reviewdate}
          </div>

          <div>
            <label>
              <strong>Last Updated:</strong>
            </label>{" "}
            {new Date(this.state.currentFundraiser.updatedAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
          </div>

          

          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {this.state.currentFundraiser.published ? "Published" : "Pending"}
          </div>

          {/** EDIT THIS SELECTION BTN */}
          <Link
            to={"/fundraisers/" + this.state.currentFundraiser.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
    )
  }
  renderFundraisersSelectionList = () => {
      return (
        <ul className="list-group">
            {this.state.fundraisers &&
              this.state.fundraisers.map((fundraiser, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === this.state.currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFundraiser(fundraiser, index)}
                  key={index}
                >
                  {fundraiser.fundlabel}
                </li>
              ))}
          </ul>
      )
  }

  renderDeleteAllBtn = ()=> {
    return (
      <React.Fragment>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={this.removeAllFundraisers}
        >
          Remove All
        </button>
      </React.Fragment>
    )
  }
  render() {

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            {/** Search for Fundraiser */}
            <input
              type="text"
              className="form-control"
              placeholder="Search by Label"
              value={this.state.searchLabel}
              onChange={this.onChangeSearchLabel}
            />

            {/** Seach Button */}
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchLabel}
              >
                Search (**Not implemented)
              </button>
            </div>
          </div>
        </div>

        {/** List of existing fundraisers */}
        <div className="col-md-6">
          <h4>Fundraisers List</h4>
          {this.renderFundraisersSelectionList()}
          {this.renderDeleteAllBtn()}
        </div>
        
        {/** Selected Fundraiser Preview */}
        <div className="col-md-6">
          {this.state.currentFundraiser ? (
            <React.Fragment>
              {this.renderFundPreview()}
            </React.Fragment>
          ) : (
            <div>
              <br />
              <p>Please click on a Fundraiser...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
