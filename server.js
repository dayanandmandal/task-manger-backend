require("./db/mongoose");
const express = require("express");
const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

const PORT = process.env.PORT || 8000;

// to parse json file in body else we will not able to access req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send();
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((err) => res.status(500).send(err));
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(500).send(err));
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send();
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
