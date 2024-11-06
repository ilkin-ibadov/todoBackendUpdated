const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// Get all todos for a user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
router.post("/", auth, async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({ userId: req.user, title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = req.body.title || todo.title;
    todo.completed =
      req.body.completed !== undefined ? req.body.completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id

    const todo = await Todo.findByIdAndDelete({ _id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
