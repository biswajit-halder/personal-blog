const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', '..', 'blogs.json');

exports.getBlogById = async (req, res) => {
  try {
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    const blog = blogs.find(b => b.id == req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.render("blog", { title: "Personal Blog - " + blog.title, blog });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error fetching blog' });
  }
}

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    
    res.render("index", { title: "Personal Blog - Home", blogs });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Something went wrong' });
  }
}