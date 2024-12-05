import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTaskStatus } from "../app/features/taskSlice";
import { Task } from "../types/taskTypes";
import { RootState } from "../app/store";
import { MdOutlineSearch } from "react-icons/md";
import Modal from "../components/Modal";
import "./Tasks.css";

const Tasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [removingTaskId, setRemovingTaskId] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleDeleteClick = useCallback((task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (taskToDelete) {
      setRemovingTaskId(taskToDelete.id);
      setTimeout(() => {
        dispatch(deleteTask(taskToDelete.id));
        setRemovingTaskId(null);
        setDeleteModalOpen(false);
        setTaskToDelete(null);
      }, 500);
    }
  }, [dispatch, taskToDelete]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleEditTask = (task: Task) => {
    navigate(`/tasks/update/${task.id}`);
  };

  const updateStatus = (status: string, id: string) => {
    if (status === "pending") {
      dispatch(
        updateTaskStatus({
          id: id,
          status: "completed",
        })
      );
    } else {
      dispatch(
        updateTaskStatus({
          id: id,
          status: "pending",
        })
      );
    }
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h1>Task List</h1>
        <div className="search-container">
          <MdOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="task-list-filter">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="task-list-part">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`task-item ${
                removingTaskId === task.id ? "remove-transition" : ""
              }`}
            >
              <div className="task-content">
                <h4 className="task-no">Task {index + 1}</h4>
                <h2 className="task-content-title">{task.title}</h2>
                <p className="task-content-description">{task.description}</p>
                <small>
                  Created at: {new Date(task.createdAt).toLocaleDateString()}
                </small>
                <div className="task-status" data-status={task.status}>
                  Status:{" "}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </div>
              </div>
              <div className="task-item-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="action-btn done-btn"
                  onClick={() => {
                    updateStatus(task.status, task.id);
                  }}
                >
                  {task.status === "pending" ? "Done" : "UnDo"}
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteClick(task)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tasks">No tasks found</div>
        )}
      </div>
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={confirmDelete}
        taskTitle={taskToDelete?.title || ""}
      />
    </div>
  );
};

export default Tasks;
