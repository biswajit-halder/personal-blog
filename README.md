# Personal Blog

A simple personal blog application built with Node.js, Express, and EJS. This project allows users to view blog posts and provides an admin interface for managing blogs.
Sample solution for the <a href="https://roadmap.sh/projects/personal-blog" target="_blank">personal-blog</a> challenge from <a href="https://roadmap.sh" target="_blank">roadmap.sh</a>.

## Features

- View all blog posts on the homepage.
- View individual blog details.
- Admin dashboard for managing blogs (add, edit, delete).
- Admin authentication with session-based login.
- Responsive design using Bootstrap.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/biswajit-halder/personal-blog.git
   cd personal-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set the following environment variables:
   ```env
   PORT=3000
   SECRET_KEY=your_secret_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_password
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`.
6. To access the admin dashboard, navigate to `http://localhost:3000/admin` and log in with the credentials specified in the `.env` file.

Usage
Public Features
Visit the homepage to view all blog posts.
Click on a blog title to view its details.
Admin Features
Navigate to /admin/login to log in as an admin.
Use the admin dashboard to:
Add new blogs.
Edit existing blogs.
Delete blogs.
Dependencies
Express - Web framework for Node.js.
EJS - Template engine for rendering views.
dotenv - For managing environment variables.
express-session - Session management.
Dev Dependencies
nodemon - For live reloading during development.