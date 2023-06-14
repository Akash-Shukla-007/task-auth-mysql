const Task = require("../Schema/taskSchema");

const home = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { email: req.user.email },
    });
    return res.status(201).json({ tasks: tasks });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const AddTask = async (req, res) => {
  console.log(req.body);
  Task.create({
    title: req.body.title,
    email: req.user.email,
  })
    .then((response) => {
      return res.status(201).json({ message: "Task Created", task: response });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err.message });
    });
};
const EditTask = async (req, res) => {
  console.log(req.body);
  try {
    const updated = await Task.update(
      { title: req.body.title },
      {
        where: { task_id: req.body.task_id },
      }
    );
    return res.status(201).json({ message: "task edited" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const DeleteTask = async (req, res) => {
  console.log(req.body);
  const task = await Task.destroy({
    where: {
      task_id: req.body.task_id,
    },
  })
    .then((result) => {
      return res.status(201).json({ message: "task deleted" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

module.exports = { home, AddTask, EditTask, DeleteTask };
