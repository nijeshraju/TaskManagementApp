import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MoreHoriz } from "@mui/icons-material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ece4e4",
    color: "#000000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function DataTable({
  tasks,
  selectedTask,
  anchorEl,
  handleMenuClose,
  handleMenuOpen,
  toggleTaskStatus,
  deleteTask,
}) {
  return (
    <Box>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Task</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>
                  {task.status ? "Completed" : "Incomplete"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, task)}>
                    <MoreHoriz />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        toggleTaskStatus(selectedTask._id, selectedTask.status);
                        handleMenuClose();
                      }}
                    >
                      {selectedTask?.status
                        ? "Mark as Incomplete"
                        : "Mark as Complete"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        deleteTask(selectedTask._id);
                        handleMenuClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
