import React, { FormEvent } from "react";
import "./Form.css";

interface FormProps {
  setTitle: (title: string) => void;
  title: string;
  setDescription: (description: string) => void;
  description: string;
  handleSubmit: (e: FormEvent) => void;
  buttonState?: string;
  titleError?: string;
  descriptionError?: string;
}

const Form: React.FC<FormProps> = ({
  setTitle,
  title,
  setDescription,
  description,
  handleSubmit,
  buttonState = "Task",
  titleError,
  descriptionError,
}) => {
  return (
    <div className="form-wrapper">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className={`form-input ${titleError ? "input-error" : ""}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Task Name"
          />
          {titleError && <span className="error-message">{titleError}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className={`form-textarea ${descriptionError ? "input-error" : ""}`}
            value={description}
            placeholder="Task Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {descriptionError && (
            <span className="error-message">{descriptionError}</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          {buttonState}
        </button>
      </form>
    </div>
  );
};

export default Form;
