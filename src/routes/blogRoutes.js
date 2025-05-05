const express = require('express');
const blogRoutes = express.Router();
const blogController = require('../controllers/blogController');

blogRoutes.get('/', blogController.getAllBlogs);
blogRoutes.get('/blogs/:id', blogController.getBlogById);

module.exports = blogRoutes;