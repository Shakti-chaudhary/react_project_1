import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { updateTask } from "../app/features/taskSlice";
import Form from "../components/Form";
import "./UpdateTask.css";

const UpdateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        updateTask({
          ...task!,
          title,
          description,
        })
      );

      navigate("/tasks");
    }
  };

  if (!task) {
    return (
      <div className="page page-container">
        <div className="updateTask-main not-found-container">
          <h1 className="not-found-title">Task Not Found</h1>
          <button
            className="back-to-tasks-btn"
            onClick={() => navigate("/tasks")}
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-container">
      <div className="updateTask-main">
        <h1 className="page-title">Task Management App</h1>
        <h2 className="section-title">Update Task</h2>
        <div className="form-container">
          <Form
            setTitle={setTitle}
            title={title}
            setDescription={setDescription}
            description={description}
            handleSubmit={handleSubmit}
            buttonState="Update Task"
            titleError={titleError}
            descriptionError={descriptionError}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
