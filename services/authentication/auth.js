const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const db = require("./../models");

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.

passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(db.User.createStrategy());

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = app => {
  app.use(
    session({
      secret: "keyboard puppy",
      resave: false,
      saveUninitialized: false
    })
  );
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/user", function(req, res) {
    console.log(req.user);
  });

  // app.get("/account", ensureAuthenticated, function(req, res) {
  //   res.render("account", { user: req.user });
  // });

  // app.get("/login", function(req, res) {
  //   res.render("login", { user: req.user });
  // });

  app.get("/register", function(req, res) {
    res.render("register", {});
  });

  app.post("/register", function(req, res) {
    db.User.register(
      new db.User({ username: req.body.username }),
      req.body.password,
      function(err, user) {
        if (err) {
          return res.send({ user: user });
        }

        passport.authenticate("local")(req, res, function() {
          res.json(req.user.username);
        });
      }
    );
  });

  app.get("/login", function(req, res) {
    res.send({ user: req.user });
  });

  app.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user.username);
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users/me", function(req, res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json(null);
    }
  });
};
