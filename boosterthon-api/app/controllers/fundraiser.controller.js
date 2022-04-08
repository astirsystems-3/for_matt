const db = require("../models");
const Fundraiser = db.fundraisers;

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
      title: req.body.title,
      description: req.body.description,
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
