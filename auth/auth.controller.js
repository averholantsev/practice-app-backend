exports.signUpUser = async (req, res) => {
  try {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  } catch (error) {
    res.json(error.message);
  }
};
