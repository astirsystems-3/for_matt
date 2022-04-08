module.exports = app => {
  const fundraiser = require("../controllers/fundraiser.controller.js");

  var router = require("express").Router();

  // Create a new Fundraiser
  router.post("/", fundraiser.validateCreateUpdate, fundraiser.create);

  // Retrieve all Fundraiser
  router.get("/", fundraiser.findAll);

  // Retrieve all published Fundraisers
  router.get("/published", fundraiser.findAllPublished);

  // Retrieve a single Fundraiser with id
  router.get("/:id", fundraiser.findOne);

  // Update a Fundraiser with id
  router.put("/:id", fundraiser.validateCreateUpdate, fundraiser.update);

  // Delete a Fundraiser with id
  router.delete("/:id", fundraiser.delete);

  // Create a new Fundraiser
  router.delete("/", fundraiser.deleteAll);

  app.use("/api/fundraisers", router);
};
