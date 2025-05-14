import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [tasks, setTasks] = useState([{ title: '', description: '', status: 'pending' }]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e, index, field) => {
        const newTasks = [...tasks];
        newTasks[index][field] = e.target.value;
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { title: '', description: '', status: 'pending' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!projectName.trim()) {
            setError('Project name is required');
            setLoading(false);
            return;
        }

        if (tasks.some(task => !task.title || !task.description)) {
            setError('All tasks must have a title and description');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_URI}/api/projects/create`,
                { name: projectName, tasks },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.data.success) {
                console.log(response.data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Failed to create project. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Create New Project</h1>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="projectName">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter your project name"
                    />
                </div>


                <div>
                    {tasks.map((task, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Task {index + 1}</h3>


                            <label className="block text-sm font-medium text-gray-700" htmlFor={`taskTitle-${index}`}>
                                Task Title
                            </label>
                            <input
                                type="text"
                                id={`taskTitle-${index}`}
                                value={task.title}
                                onChange={(e) => handleInputChange(e, index, 'title')}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Task Title"
                            />

                            <label className="block text-sm font-medium text-gray-700" htmlFor={`taskDescription-${index}`}>
                                Task Description
                            </label>
                            <textarea
                                id={`taskDescription-${index}`}
                                value={task.description}
                                onChange={(e) => handleInputChange(e, index, 'description')}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Task Description"
                            ></textarea>

                            <label className="block text-sm font-medium text-gray-700" htmlFor={`taskStatus-${index}`}>
                                Task Status
                            </label>
                            <select
                                id={`taskStatus-${index}`}
                                value={task.status}
                                onChange={(e) => handleInputChange(e, index, 'status')}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addTask}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
                >
                    Add Task
                </button>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default CreateProject;

