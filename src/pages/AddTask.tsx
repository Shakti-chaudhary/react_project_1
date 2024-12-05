import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../app/features/taskSlice";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import "./AddTask.css";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (title.trim()) {
      setTitleError("");
    }
  }, [title]);

  useEffect(() => {
    if (description.trim()) {
      setDescriptionError("");
    }
  }, [description]);

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
        addTask({
          title,
          description,
          status: "pending",
        })
      );

      setTitle("");
      setDescription("");

      navigate("/tasks");
    }
  };

  return (
    <div className="page page-container">
      <div className="addTask-main">
        <h1 className="page-title">Task Management App</h1>
        <h2 className="section-title">Add New Task</h2>
        <div className="form-container">
          <Form
            setTitle={setTitle}
            title={title}
            setDescription={setDescription}
            description={description}
            handleSubmit={handleSubmit}
            buttonState="Add Task"
            titleError={titleError}
            descriptionError={descriptionError}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTask;
