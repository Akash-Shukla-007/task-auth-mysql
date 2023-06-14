import React, { useEffect, useState } from "react";
import TasksCard from "../../components/TasksCard";
import NewTaskModal from "../../components/NewTaskModal";
import { Modal } from "bootstrap";
import { defaultPage } from "../../Services/AxiosServices/httpRequests";
import { BiLoaderCircle } from "react-icons/bi";

function Default() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [title, setTitle] = useState("");
  const LogoutHandler = () => {
    localStorage.removeItem("Logintoken");
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    defaultPage()
      .then((res) => {
        setLoading(false);
        setData(res.data.tasks);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="root_default_container">
      <nav className="root_default_navbar">
        <ul>
          <li>Home</li>
          <li onClick={LogoutHandler}>Logout</li>
        </ul>
      </nav>
      <button
        type="button"
        class="btn btn-primary root_default_top_container"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add New Task
      </button>
      <NewTaskModal title={""} />

      <div className="root_default_content">
        {data.map((item, index) => {
          return (
            <TasksCard key={index} title={item.title} task_id={item.task_id} />
          );
        })}
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
}

export default Default;
