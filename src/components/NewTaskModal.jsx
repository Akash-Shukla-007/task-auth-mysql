import React, { useState } from "react";
import { AddTask } from "../Services/AxiosServices/httpRequests";

function NewTaskModal({ title }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(title);

  const handleSave = async () => {
    setLoading(true);
    if (value == null) return;
    AddTask(value)
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                New Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                className="input_modal"
                type="text"
                placeholder="Enter Tasks Name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
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
    </>
  );
}

export default NewTaskModal;
