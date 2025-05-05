const checkSession = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next();
    } else {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/admin/login'); // Redirect to the login page
        });
    }
};

module.exports = { checkSession };