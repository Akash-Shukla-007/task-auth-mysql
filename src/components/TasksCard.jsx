import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import NewTaskModal from "./NewTaskModal";
import EditTaskModal from "./EditTaskModal";
import { deleteTask } from "../Services/AxiosServices/httpRequests";

function TasksCard({ title, task_id }) {
  console.log(task_id);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    console.log(task_id);
    deleteTask(task_id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => [console.log(err)]);
  };
  return (
    <div className="tasks_card_root_container">
      <div>{title} </div>
      <div className="tasks_card_button_container">
        <AiFillEdit
          color="blue"
          className="task_buttons"
          size={30}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        />
        <EditTaskModal title={title} task_id={task_id} />
        {/* <AiFillEdit color="blue" size={30} className="task_buttons" /> */}
        <AiFillDelete
          color="red"
          size={30}
          className="task_buttons"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default TasksCard;
