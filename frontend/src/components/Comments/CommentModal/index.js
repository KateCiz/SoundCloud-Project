import { Modal } from '../../../context/Modal'
import React, { useState } from "react";
import CreateCommentForm from "../CommentForm";
import "./index.css"

function CommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className="comment-modal-button"
        onClick={() => setShowModal(true)}>
        Add Comment
      </button>
      {showModal && (
        <Modal onExit={() => setShowModal(false)}>
            <CreateCommentForm 
              hideForm={() => setShowModal(false)}
            />
        </Modal>
      )}
    </>
  );
}

export default CommentModal;