const db = require("../models");
const moment = require("moment");
const Fundraiser = db.fundraisers;

const inRange = (x, min, max) => {
  return ((x-min)*(x-max) <= 0);
}

const validateEmail = (email2check)=>{
  if(typeof(email2check) === 'string'){
    let emailValid = email2check.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(emailValid){
      return true;
    }
  }else{
    // email must be a string
    return false;
  };
}
// validate Middleware for create POST body
exports.validateCreateUpdate = (req, res, next) => {
  // validate create fundraiser body
  console.log(req.body)
  const ratingValue = parseInt(req.body.rating);
  const isValid = (
    // fundLabel
    typeof(req.body.fundlabel) === 'string' &&
    req.body.fundlabel['length'] >=3 &&

    // rating
    typeof(ratingValue) === "number" &&
    inRange(ratingValue, 1,5) &&

    // review
    typeof(req.body.review) === 'string' &&
    req.body.review['length'] >=3 &&

    // Reviewer Name
    typeof(req.body.reviewername) === 'string' &&
    req.body.reviewername['length'] >=3 &&

    // REVIEWER EMAIL
    req.body.revieweremail &&
    validateEmail(req.body.revieweremail) &&

    // REVIEW DATE
    moment(req.body.reviewDate).isValid()
  );

  if(isValid){
    next();
  }else{
    res.status(400).send({message: "Form Body is incorrect"});
  }

}
// Create and Save a new Fundraiser
exports.create = (req, res) => {
  // Validate request
  const doesntHaveRequiredFields = (
    !req.body.fundlabel && 
    !req.body.review &&
    !req.body.revieweremail &&
    !req.body.reviewername 
  );
  if (doesntHaveRequiredFields) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }else{

    // Create a Fundraiser
    const newFundraiser = new Fundraiser({
      published: req.body.published ? req.body.published : false,
      
      fundlabel : req.body.fundlabel,
      rating : req.body.rating,
      review : req.body.review,
      reviewername: req.body.reviewername,
      revieweremail: req.body.revieweremail,
      reviewdate:  req.body.reviewdate,
      
    });

    // Save Fundraiser in the database
    newFundraiser
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the newFundraiser."
        });
      });
  }
};

// Retrieve all Fundraiser from the database.
exports.findAll = (req, res) => {
  const label = req.query.label;
  var condition = label ? { label: { $regex: new RegExp(label), $options: "i" } } : {};

  Fundraiser.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fundraisers."
      });
    });
};

// Find a single Fundraiser with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Fundraiser.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Fundraiser with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Fundraiser with id=" + id });
    });
};

// Update a Fundraiser by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Fundraiser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Fundraiser with id=${id}. Maybe Fundraiser was not found!`
        });
      } else res.send({ message: "Fundraiser was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Fundraiser with id=" + id
      });
    });
};

// Delete a Fundraiser with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Fundraiser.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fundraiser with id=${id}. Maybe Fundraiser was not found!`
        });
      } else {
        res.send({
          message: "Fundraiser was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Fundraiser with id=" + id
      });
    });
};

// Delete all Fundraiser from the database.
exports.deleteAll = (req, res) => {
  Fundraiser.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Fundraisers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all fundraisers."
      });
    });
};

// Find all published Fundraiser
exports.findAllPublished = (req, res) => {
  Fundraiser.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fundraisers."
      });
    });
};
