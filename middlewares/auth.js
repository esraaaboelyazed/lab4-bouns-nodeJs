const authenticate = (req, res, next) => {
  const { username, password } = req.headers;
  //dummy
  if (username !== "esraa" && password !== "2721997")
    return res.status(401).send("username or password are wrong");

  next();
};

module.exports = authenticate;
