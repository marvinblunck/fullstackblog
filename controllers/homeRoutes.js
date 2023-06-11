const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all blogs and JOIN with user data
      const blogData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render("login")
  });

  module.exports= router;