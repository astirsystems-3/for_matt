/**
 * @module Controllers_Articles
 * @description HTTP Request Routing for Articles Collection
 */
const db = require("../models");
const Article = db.article;

/**
 * Create and Save a new Article 
 * @param {*} req Incoming HTTP Request via Express
 * @param {*} res Outgoing Response Post Handling Req..
 * @returns "Response post create entry attempt"
 */
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Article
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Article in the database
  Article
    .save(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
};

/**
 * Retrieve all Articles from the database.
 * @param {*} req Incoming HTTP Request via Express
 * @param {*} res Outgoing Response Post Handling Req..
 */
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Article.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

/**
 * Find a single Article with an id
 * @param {*} req Incoming HTTP Request via Express
 * @param {*} res Outgoing Response Post Handling Req..
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found article with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving article with id=" + id });
    });
};

/**
 * Update a article by the id in the request
 * @param {*} req Incoming HTTP Request via Express
 * @param {*} res Outgoing Response Post Handling Req..
 */
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      } else {
        res.send({
          message: "Article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

/**
 * Delete all Articles from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteAll = (req, res) => {
  Article.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Articles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    });
};

/**
 * Find all published Articles
 * @param {*} req 
 * @param {*} res 
 */
exports.findAllPublished = (req, res) => {
  Article.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};
