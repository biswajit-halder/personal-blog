const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

const blogRoutes = require("./src/routes/blogRoutes");
const blogAdminRoutes = require("./src/routes/blogAdminRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Configure session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Set views path and apply session checking for /admin
app.use('/admin', (req, res, next) => {
    app.set('views', './src/views/admin');
    next();
}, blogAdminRoutes);

app.use('/', blogRoutes);

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});