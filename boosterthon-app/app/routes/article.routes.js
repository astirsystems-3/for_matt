/** Express router providing user related routes
 * @module Routers_Articles
 * @requires express
 * @description HTTP Request Request Routing for Articles Collection
 */

module.exports = app => {
	const controller = require("../controllers/article.controller.js");

	const router = require("express").Router();

	/**
	 * @name post_/articles/
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Retrieve all articles
	 */
	router.post("/", controller.create);

	/**
	 * @name get_/articles
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Retrieve all articles
	 */
	router.get("/", controller.findAll);

	/**
	 * @name get_/articles
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Retrieve all articles
	 */
	router.get("/findall", controller.findAll);

	/**
	 * @name get_/published
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Retrieve all published articles
	 */
	router.get("/published", controller.findAllPublished);

	/**
	 * @name get_/:id
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Retrieve a single article with id
	 */
	router.get("/:id", controller.findOne);

	/**
	 * @name put_/:id
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description update article by id
	 */
	router.put("/:id", controller.update);

	/**
	 * @name delete_/:id
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description delete article by id
	 */
	router.delete("/:id", controller.delete);

	/**
	 * @name delete_/:id
	 * @param {string} path - Express path
	 * @param {callback} middleware - Express middleware.
	 * @description Delete all entries
	 */
	router.delete("/", controller.deleteAll);


	app.use("/api/articles", router);
};
