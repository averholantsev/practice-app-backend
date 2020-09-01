const express = require("express");
const passport = require("passport");

const AuthRouter = require("./auth/auth.route");
const SecureRoutes = require("./routes");

const PORT = 5000;
const app = express();

app.use(express.json()); // Read body

// ROUTES //
app.use("/auth", passport.authenticate("jwt", { session: false }), SecureRoutes);
AuthRouter.routesConfig(app);

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
