import React, { Component } from "react";
import FundraiserDataService from "../services/fundraiser.service";

export default class AddFundraiser extends Component {
	constructor(props) {
		super(props);

		/** set initial state */
		this.state = {
			
			id: null,
			title: "",
			description: "",

				fundlabel : "",
				rating : "",
				review : "",
				reviewername: "",
				revieweremail: "",
				reviewdate:  new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ,

			// Validation Field States
			fundlabelValid : null,
			ratingValid : null,
			reviewValid : null,
			reviewerValid : null,
			emailValid : null,

			// Error Notification Verbiage
			formErrors : {
				label : null,
				rating : null,
				review : null,
				reviewer : null,
				email : null,
			},


			
			// State props
			published: false,
			submitted: false
		};
	}

	/** Validates  Form after checking fields */
	validateForm = () => {
		console.log("\n ####VALIDATING FORM");
		// Validate all required fields
		this.validateField('fundlabel', this.state.fundlabel);
		this.validateField('rating', this.state.rating);
		this.validateField('review', this.state.review);
		this.validateField('reviewername', this.state.reviewername);
		this.validateField('revieweremail', this.state.revieweremail);
	}


	inRange = (x, min, max) => {
		return ((x-min)*(x-max) <= 0);
	}

	/** Validate Form */
	validateField = (fieldName, value) => {
		console.log('-->Validating Input:'+fieldName);
		// Current Form Error Notification Verbiage
		let newFieldValidationErrors = this.state.formErrors;

		// current isValid Bools'
		let fundlabelValid = this.state.fundlabelValid;
		// let ratingValid = parseInt(this.state.ratingValid);
		let ratingValid = this.state.ratingValid;
		let reviewValid = this.state.reviewValid;
		let reviewerValid = this.state.reviewerValid;
		let emailValid = this.state.emailValid;

		let parsedRatingNum = parseInt(this.state.rating) || null;

	
		switch(fieldName) {
			// VALIDATE FUNDRAISER LABEL
			case 'fundlabel':
				fundlabelValid = (
					typeof(value) === "string" &&
					value.length >= 3 &&
					true
				);

				if(fundlabelValid === true){
					fundlabelValid = null;
					newFieldValidationErrors.label = null;
				}else{
					fundlabelValid = false;
					newFieldValidationErrors.label = ' needs to be at least 3 chars';
				}

				break;
			
			// VALIDATE RATING
			case 'rating':
				value = parseInt(value);
				ratingValid = (
					typeof(value) === "number" &&
					this.inRange(value, 1,5) &&
					true
				);

				if(ratingValid === true){
					ratingValid = null;
					parsedRatingNum = parseInt(value);
					newFieldValidationErrors.rating = null;
				}else{
					ratingValid = false;
					newFieldValidationErrors.rating = ' needs to be Number 1-5';
				}
				break;

			// VALIDATE REVIEW
			case 'review':
				reviewValid = (
					typeof(value) === "string" &&
					value.length >= 3 &&
					true
				);

				if(reviewValid === true){
					reviewValid = null;
					newFieldValidationErrors.review = null;
				}else{
					reviewValid = false;
					newFieldValidationErrors.review = ' needs to be at least 3 chars';
				}

				break;

			// VALIDATE REVIEWER NAME
			case 'reviewername':
				reviewerValid = (
					typeof(value) === "string" &&
					value.length >= 3 &&
					true
				);

				if(reviewerValid === true){
					reviewerValid = null;
					newFieldValidationErrors.reviewer = null;
				}else{
					reviewerValid = false;
					newFieldValidationErrors.reviewer = ' needs to be at least 3 chars';
				}

				break;

			// VALIDATE EMAIL
			case 'revieweremail':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				newFieldValidationErrors.email = emailValid ? null : ' is invalid';
				emailValid = emailValid ? false : null;
				break;



			default:
				break;
		}
		
		// Update Existing Validation Error Notification & isValid State
		this.setState({formErrors: newFieldValidationErrors,
			fundlabelValid,
			ratingValid,
			rating: parseInt(parsedRatingNum),
			reviewValid,
			emailValid,
		}, this.doneValidating());
	}

	doneValidating = () => {
		console.log("  ###=> Done Validating Form");
		console.log(this.state)

		// check for any errors
		const formErrorKeys = Object.keys(this.state.formErrors);
		const hasNoErrors = Object.values(this.state.formErrors).every(x => x === null || x === '' || x === undefined);
		if(hasNoErrors){
			this.saveFundraiser();
		}else{
			// still has form errors
		}
	}
	
	// validateEmail = () => {
	// 	const currentEmail = this.state.revieweremail;
	// 	let newFormErrors = this.state.formErrors;
	// 	let emailValid = this.state.emailValid;
	// 	emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	// 	newFormErrors[email]

	// 	this.setState({formErrors: {...currentFormErrors, {"email":" is invalid"});
	// 	this.state.email = emailValid ? '' : ' is invalid';

	// }


	
	/** Handle Text input field Updates */
	onInputFieldUpdate = (e) =>  {
		// console.log(e.target);
		console.log("Updated" + e.target.name);
		
		const updateStateProp = {};
		updateStateProp[e.target.name] = e.target.value;
		this.setState(updateStateProp);
	}


	/** Validate then Save if good, update errors state if bad */
	saveFundraiser = () => {
		var data = {
			fundlabel : this.state.fundlabel,
			rating : this.state.rating,
			review : this.state.review,
			reviewername: this.state.reviewername,
			revieweremail: this.state.revieweremail,
			reviewdate:  this.state.reviewdate,
		};

		FundraiserDataService.create(data)
			.then(response => {
				this.setState({
					id: response.data.id,
					published: response.data.published,
					fundlabel : response.data.fundlabel,
					rating : response.data.rating,
					review : response.data.review,
					reviewername:response.data.reviewername,
					revieweremail: response.data.revieweremail,
					reviewdate:  response.data.reviewdate,
					
					// set successfull update
					submitted: true
				});
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	/**
	 * Set form state for new entry
	 */
	newFundraiser = () => {
		this.setState({
			id: null,
			title: "",
			description: "",
			published: false,

			fundlabel : "",
			rating : "",
			review : "",
			reviewername: "",
			revieweremail: "",
			reviewdate:  new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ,

			submitted: false
		});
	}

	renderSuccesState = () => {
		return (
			<div>
				<h4>You submitted successfully!</h4>
				
				{/** Create another ADD button */}
				<button className="btn btn-success" onClick={this.newFundraiser}>
					Add
				</button>
			</div>
		)
	}

	renderEditCreateForm = () => {
		return (
			<div>
				{/** FUNDRAISER LABEL INPUT */}
				<div className="form-group">
					<label htmlFor="fundlabel">Fundraiser Label</label>
					<input
						type="text"
						className="form-control"
						id="fundlabel"
						required
						value={this.state.fundlabel}
						onChange={this.onInputFieldUpdate}
						name="fundlabel"
					/>
				</div>

				{/** RATING INPUT */}
				<div className="form-group">
					<label htmlFor="rating">Rating (1-5)</label>
					<input
						type="text"
						className="form-control"
						id="rating"
						required
						value={ this.state.rating || ""}
						onChange={this.onInputFieldUpdate}
						name="rating"
					/>
				</div>

				{/** REVIEW INPUT */}
				<div className="form-group">
					<label htmlFor="review">Review</label>
					<input
						type="text"
						className="form-control"
						id="review"
						required
						value={this.state.review || ""}
						onChange={this.onInputFieldUpdate}
						name="review"
					/>
				</div>

				{/** REVIEWER NAME INPUT */}
				<div className="form-group">
					<label htmlFor="reviewername">Reviewer Name</label>
					<input
						type="text"
						className="form-control"
						id="reviewername"
						required
						value={this.state.reviewername}
						onChange={this.onInputFieldUpdate}
						name="reviewername"
					/>
				</div>

				{/** REVIEWER EMAIL INPUT */}
				<div className="form-group">
					<label htmlFor="revieweremail">Reviewer Email</label>
					<input
						type="text"
						className="form-control"
						id="revieweremail"
						required
						value={this.state.revieweremail}
						onChange={this.onInputFieldUpdate}
						name="revieweremail"
					/>
				</div>

				{/** Validate form & Submit */}
				<button onClick={this.validateForm} className="btn btn-success">
					Submit
				</button>
			</div>
		)
	}

	/**
	 * 
	 * @returns Form Field Errors if Exist
	 */
	renderFormErrors = () => {
		const formErrorKeys = Object.keys(this.state.formErrors);
		let hasNoErrors = Object.values(this.state.formErrors).every(x => x === null || x === '');
		return (
			<React.Fragment>
				{hasNoErrors ? <React.Fragment></React.Fragment> : 
					<React.Fragment>
							<h2>Form Errors: </h2>
							<ul className="errorList" style={{color: "red"}}>
								{
									formErrorKeys.filter((errorKey)=> this.state.formErrors[errorKey] != null ).map((errorKey, index) => (
										<li	
											key={"err_"+errorKey}
										>
											{errorKey + ": "+this.state.formErrors[errorKey]}
										</li>
										
										
									))
								}
							</ul>
					</React.Fragment>
				}
				
			</React.Fragment>
		)
	}
	
	/**
	 * 
	 * @returns Submition Success State or Edit/Create Input Form
	 */
	render() {
		return (
			<div className="submit-form">
					{this.state.submitted === true ? <React.Fragment>{this.renderSuccesState()}</React.Fragment> : <React.Fragment> {this.renderEditCreateForm()}</React.Fragment> }
					{this.renderFormErrors()}
			</div>
		);
	}
}
