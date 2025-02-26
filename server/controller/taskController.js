const Task = require("../model/task");

// create task
const createTask = async (req, res) => {
  try {
    const { taskName } = req.body;
    if (!taskName) {
      return res.status(400).json({ message: "Task name required" });
    }

    const task = await Task.create({ taskName });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// get task list
const getAllTasks = async (req, res) => {
  try {
    const { filter } = req.query;

    let query = {};
    if (filter) query.status = filter === "completed" ? true : false;

    const tasks = await Task.find(query);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Task id required" });
    }

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Task id required" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
