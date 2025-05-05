const express = require('express');
const blogAdminRoutes = express.Router();
const blogAdminController = require('../controllers/blogAdminController');

const { checkSession } = require('../middleware/authMiddleware');

blogAdminRoutes.get('/', checkSession, blogAdminController.home);
blogAdminRoutes.get('/login', blogAdminController.login);
blogAdminRoutes.get('/logout', blogAdminController.logout);

blogAdminRoutes.post('/login', blogAdminController.postLogin);

blogAdminRoutes.get('/blog/edit/:id', checkSession, (blogAdminController.editBlog));
blogAdminRoutes.post('/blog/edit/:id', checkSession, (blogAdminController.postEditBlog));

blogAdminRoutes.get('/blog/delete/:id', checkSession, (blogAdminController.deleteBlog));

blogAdminRoutes.get('/blog/add', checkSession, (blogAdminController.addNewBlog));
blogAdminRoutes.post('/blog/add', checkSession, (blogAdminController.postNewBlog));
module.exports = blogAdminRoutes;