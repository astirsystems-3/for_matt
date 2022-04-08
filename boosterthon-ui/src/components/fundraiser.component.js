import React, { Component } from "react";
import FundraiserDataService from "../services/fundraiser.service";

export default class Fundraiser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFundraiser: {
        id: null,
        title: "",
        description: "",

        fundlabel : "",
				rating : -1,
				review : "",
				reviewername: "",
				revieweremail: "",
				reviewdate:  "",

        published: false
      },

      message: ""
    };
  }

  componentDidMount() {
    this.getFundraiser(this.props.match.params.id);
  }

  /** Handle Text input field Updates */
	onInputFieldUpdate = (e) =>  {
		// console.log(e.target);
		console.log("Updated field: " + e.target.name + " : "+e.target.value);
    const keyName = e.target.name;
    const newVal = e.target.value

		
		this.setState((prevState)=>{
      let updateObj = {
        // ...prevState,
        currentFundraiser: {
          ...prevState.currentFundraiser,
        }
      };

      updateObj['currentFundraiser'][keyName] = newVal;

      return updateObj;
    });
	}

  getFundraiser = (id) => {
    FundraiserDataService.get(id)
      .then(response => {
        this.setState({
          currentFundraiser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished = (status) => {
    var data = {
      id: this.state.currentFundraiser.id,
      title: this.state.currentFundraiser.title,
      description: this.state.currentFundraiser.description,
      published: status,

      fundlabel : this.state.currentFundraiser.fundlabel,
      rating : this.state.currentFundraiser.rating,
      review : this.state.currentFundraiser.review,
      reviewername: this.state.currentFundraiser.reviewername,
      revieweremail: this.state.currentFundraiser.revieweremail,
      reviewdate:  this.state.currentFundraiser.reviewdate,
    };

    FundraiserDataService.update(this.state.currentFundraiser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFundraiser: {
            ...prevState.currentFundraiser,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFundraiser = () => {
    FundraiserDataService.update(
      this.state.currentFundraiser.id,
      this.state.currentFundraiser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Fundraiser was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFundraiser = () => {    
    FundraiserDataService.delete(this.state.currentFundraiser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/fundraisers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderForm = () => {
    return (
      <div className="edit-form">
            <h4>Modify Existing Fundraiser</h4>
            {/** Update Selected Fundraiser */}
            <form>
              {/** FUNDraiser Label */}
              <div className="form-group">
                <label htmlFor="fundlabel">Fundraiser Label</label>
                <input
                  type="text"
                  className="form-control"
                  id="fundlabel"
                  name="fundlabel"
                  value={this.state.currentFundraiser.fundlabel}
                  onChange={this.onInputFieldUpdate}
                />
              </div>
              
              {/** Rating */}
              <div className="form-group">
                <label htmlFor="rating">rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="rating"
                  name="rating"
                  value={this.state.currentFundraiser.rating}
                  onChange={this.onInputFieldUpdate}
                />
              </div>

              {/** Review INput */}
              <div className="form-group">
                <label htmlFor="review">review</label>
                <input
                  type="text"
                  className="form-control"
                  id="review"
                  name="review"
                  value={this.state.currentFundraiser.review}
                  onChange={this.onInputFieldUpdate}
                />
              </div>

              {/** reviewer name input */}
              <div className="form-group">
                <label htmlFor="reviewername">reviewername</label>
                <input
                  type="text"
                  className="form-control"
                  id="reviewername"
                  name="reviewername"
                  value={this.state.currentFundraiser.reviewername}
                  onChange={this.onInputFieldUpdate}
                />
              </div>

              {/** revieweremail */}
              <div className="form-group">
                <label htmlFor="revieweremail">revieweremail</label>
                <input
                  type="text"
                  className="form-control"
                  id="revieweremail"
                  name="revieweremail"
                  value={this.state.currentFundraiser.revieweremail}
                  onChange={this.onInputFieldUpdate}
                />
              </div>

              {/** Display Published Status */}
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {this.state.currentFundraiser.published ? "Published" : "Pending"}
              </div>


            </form>

            {/** Modify Buttons */}
            {this.state.currentFundraiser.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFundraiser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFundraiser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
    )
  }

  
  renderNoSelectionMade = () => {
    return (
      <div>
        <br />
        <p>Please click on a Fundraiser...</p>
      </div>
    )
  }

  /**
   * 
   * @returns Modify Existing Item or No Current Selection Notification
   */
  render() {
    return (
      <div>
        {this.state.currentFundraiser ? (
          <React.Fragment>{this.renderForm()}</React.Fragment>
        ) : (
          <React.Fragment>this.renderNoSelectionMade()</React.Fragment>
        )}
      </div>
    );
  }
}
