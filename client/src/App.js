import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import DataTable from "../component/table";

const apiUrl = process.env.BACKEND_URL;

const App = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}?filter=${filter}`);
      setTasks(response?.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add Task
  const addTask = async () => {
    if (!taskName.trim()) return;

    try {
      const response = await axios.post(apiUrl, { taskName });
      if (response.status !== 200) {
        console.log(response.data);
      }
      fetchTasks();
      setTaskName("");
      setOpen(false);
      setMessage({ text: "Task added successfully!", type: "success" });
    } catch (error) {
      console.error("Error adding task:", error);
      setMessage({ text: "Failed to add task", type: "error" });
    }
  };

  // Toggle Task Status
  const toggleTaskStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/${id}`, { status: !status });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: !status } : task,
        ),
      );
      setMessage({ text: "Task status updated!", type: "success" });
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage({ text: "Failed to update task", type: "error" });
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage({ text: "Task deleted successfully!", type: "success" });
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage({ text: "Failed to delete task", type: "error" });
    }
  };

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  return (
    <Container maxWidth="sm">
      <h1>Task Manager</h1>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Box display="flex" alignItems="center">
          <Typography marginRight={2}>Filter By</Typography>
          <FormControl size="small">
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </Box>

      <DataTable
        tasks={tasks}
        selectedTask={selectedTask}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuOpen={handleMenuOpen}
        toggleTaskStatus={toggleTaskStatus}
        deleteTask={deleteTask}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(message.text)}
        autoHideDuration={3000}
        onClose={() => setMessage({ text: "", type: "" })}
      >
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
