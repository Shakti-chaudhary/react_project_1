import React from "react";
import "./Modal.css";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const Modal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h2>Delete Task</h2>
          <p>Are you sure you want to delete the task "{taskTitle}"?</p>
          <div className="modal-actions">
            <button className="modal-btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="modal-btn confirm-btn" onClick={onConfirm}>
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
