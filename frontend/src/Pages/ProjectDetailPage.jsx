import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [taskLoading, setTaskLoading] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [reload, setReload] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URI}/api/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProject(res.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching project data.');
                setLoading(false);
                console.error('Error fetching project:', err);
            }
        };

        fetchProject();
    }, [projectId, reload]);

    const handleDeleteProject = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_URI}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to delete project.');
            console.error('Failed to delete project:', err);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            setTaskLoading(true);
            const res = await axios.patch(
                `${import.meta.env.VITE_URI}/api/projects/${projectId}/task/${taskId}/status`,
                { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            setProject((prev) => ({
                ...prev,
                tasks: prev.tasks.map((t) =>
                    t._id === taskId ? { ...t, status: newStatus, completedAt: newStatus === 'Completed' ? new Date() : null } : t
                ),
            }));

            setTaskLoading(false);
        } catch (err) {
            setError('Failed to update task.');
            setTaskLoading(false);
            console.error('Failed to update task:', err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_URI}/api/projects/${projectId}/task/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProject((prev) => ({
                ...prev,
                tasks: prev.tasks.filter((t) => t._id !== taskId),
            }));
        } catch (err) {
            setError('Failed to delete task.');
            console.error('Failed to delete task:', err);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!newTask.title || !newTask.description) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_URI}/api/projects/${projectId}/addtask`,
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            tasks: [...(project.tasks || []), res.data.task],

                setNewTask({ title: '', description: '', status: 'Not Started' });
            setReload(!reload);
            navigate(`/project/${projectId}`);
        } catch (err) {
            setError('Failed to add task.');
            console.error('Failed to add task:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) return <div className="p-6">Loading project...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700">{project.name}</h2>
                    <button
                        onClick={handleDeleteProject}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete Project
                    </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {!project.tasks || project.tasks.length === 0 ? (
                    <p className="text-gray-600">No tasks in this project yet.</p>
                ) : (
                    <div className="space-y-6">
                        {project.tasks.map((task, index) => (
                            <div
                                key={task._id}
                                className="bg-gray-50 border rounded-lg p-4 shadow-sm flex justify-between items-start"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                                        {index + 1}. {task.title}
                                    </h3>
                                    <p className="text-gray-700 mb-1 break-words whitespace-pre-wrap overflow-y-hidden">{task.description}</p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Created: {new Date(task.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Completed:{' '}
                                        {task.completedAt
                                            ? new Date(task.completedAt).toLocaleDateString()
                                            : 'pending'}
                                    </p>

                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                                        className="border px-3 py-1 rounded focus:ring-indigo-400"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                                >
                                    Delete Task
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-indigo-700 mb-4">Add New Task</h3>
                    <form onSubmit={handleAddTask} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newTask.title}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newTask.description}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={newTask.status}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
