const express = require("express");
const router = express.Router();
const { users, validate } = require("../models/user");
const authenticate = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const user = await users.find();
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await users.findById(id);
  if (!user) return res.status(404).send("no user with the given id");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = validate({ username, email, password });

  if (error) return res.status(400).send(error.details[0].message);

  const user = await new users({ username, email , password}).save();
  res.send(user);
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const { error } = validate({ username, email, password });
  if (error) return res.status(400).send(error.details[0].message);

  const user = await users.findById(id);
  if (!user) return res.status(404).send("no user with the given id");

  user.set({ username, email, password });
  res.send(await user.save());
});

router.delete("/:_id", authenticate, async (req, res) => {
  const { _id } = req.params;
  const user = await users.findById(_id);
  await users.deleteOne({ _id });
  res.send(user);
});

module.exports = router;
