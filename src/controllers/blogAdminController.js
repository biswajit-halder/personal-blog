const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', '..', 'blogs.json');

const checkFileExists = () => {
    if (!fs.existsSync(blogDataPath)) {
        fs.writeFileSync(blogDataPath, JSON.stringify([]), 'utf-8');
    }
}

checkFileExists();

exports.home = (req, res) => {
    const username = req.session.username;
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    res.render("index", { title: "Personal Blog - Dashboard", blogs, username });
};

exports.login = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
    });
    res.render("login", { title: "Personal Blog - Login" });
}

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
            }
        });
        return res.redirect('/admin');
    }
    res.render("login", { title: "Personal Blog - Login", error: "Invalid credentials" });
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/admin/login');
    });
}

exports.editBlog = (req, res) => {
    const blogId = req.params.id;
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    const blog = blogs.find(b => b.id == blogId);
    console.log(blogs, blogId, blog);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    res.render("mod_blog", { title: "Edit Blog", blog });
}

exports.postEditBlog = (req, res) => {
    const blogId = req.params.id;
    const { title, desc } = req.body;
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    const blogIndex = blogs.findIndex(b => b.id == blogId);
    if (blogIndex === -1) {
        return res.status(404).send('Blog not found');
    }
    blogs[blogIndex].title = title;
    blogs[blogIndex].desc = desc;
    fs.writeFileSync(blogDataPath, JSON.stringify(blogs, null, 2), 'utf-8');
    res.redirect('/admin');
}

exports.addNewBlog = (req, res) => {
    res.render("mod_blog", { title: "Add New Blog" });
}

exports.postNewBlog = (req, res) => {
    const { title, desc } = req.body;
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

    // Find the last ID dynamically
    const lastId = blogs.length > 0 ? blogs[blogs.length - 1].id : 0;

    // Create a new blog with the current date
    const newBlog = {
        id: lastId + 1,
        title,
        desc,
        date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    blogs.push(newBlog);
    fs.writeFileSync(blogDataPath, JSON.stringify(blogs, null, 2), 'utf-8');
    res.redirect('/admin');
};

exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    const blogs = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    const blogIndex = blogs.findIndex(b => b.id == blogId);
    if (blogIndex === -1) {
        return res.status(404).send('Blog not found');
    }
    blogs.splice(blogIndex, 1);
    fs.writeFileSync(blogDataPath, JSON.stringify(blogs, null, 2), 'utf-8');
    res.redirect('/admin');
}
