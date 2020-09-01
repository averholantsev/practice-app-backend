const { signUpUser } = require("./auth.controller");
const {
  signupAuthMiddleware,
  loginMiddleware,
  signupMiddleware,
  checkJWTValidity,
} = require("./auth.middleware");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.routesConfig = function (app) {
  loginMiddleware;
  signupMiddleware;
  checkJWTValidity
  app.post("/signup", signupAuthMiddleware, signUpUser);
  app.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An Error occurred");
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { id: user.id, email: user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user: body }, "bonanza");
          //Send back the token to the user
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
};
