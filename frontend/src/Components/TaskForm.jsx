// src/Components/TaskForm.jsx
import { useState } from "react";

const TaskForm = ({ projectId, onCreate }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !desc.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            description: desc,
            status: "Pending",
            createdAt: new Date().toISOString().split("T")[0],
            completedAt: "",
            projectId,
        };

        onCreate(newTask);
        setTitle("");
        setDesc("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2 font-medium">Task Title:</label>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-3"
                placeholder="Enter task title"
            />

            <label className="block text-gray-700 mb-2 font-medium">Description:</label>
            <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-3"
                placeholder="Enter task description"
            />

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Create Task
            </button>
        </form>
    );
};

export default TaskForm;
