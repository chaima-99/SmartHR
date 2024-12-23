import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddTaskPage = () => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() && assignedTo.trim()) {
      setTasks([...tasks, { task: newTask, assignedTo, completed: false }]);
      setNewTask("");
      setAssignedTo("");
    }
  };

  return (
    <div className="flex p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border rounded-l-lg py-2 px-4 w-full"
              required
            />
            <input
              type="text"
              placeholder="Assign to"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="border rounded-r-lg py-2 px-4 w-1/3"
              required
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
              Add Task
            </button>
          </div>
        </form>

        <h3 className="text-xl font-bold mb-2">Assigned Tasks</h3>
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {task.task} (Assigned to: {task.assignedTo})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTaskPage;