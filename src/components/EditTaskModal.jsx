import React, { useState } from "react";
import { editTask } from "../Services/AxiosServices/httpRequests";

function EditTaskModal({ title, task_id }) {
  const [value, setValue] = useState(title);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    var title = value;
    if (title == null) return;
    setLoading(true);
    editTask({ task_id, title })
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="input_modal"
              type="text"
              placeholder="Enter Tasks Name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
