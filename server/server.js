require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthService = require('./services/AuthService');
const AuthServiceInstance = new AuthService();

// middleware
app.use(cors());
app.use(express.json());

// middlewares
app.use(cors());

app.use(express.json());
// Creates a session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Set method to deserialize data stored in cookie and attach to req.user
passport.deserializeUser((id, done) => {
  done(null, { id });
});

// Configure local strategy to be use for local login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await AuthServiceInstance.login({
        email: username,
        password,
      });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
