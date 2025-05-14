import { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            setLoading(true);

            const res = await axios.post(
                "/projects",
                { title: name.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data && res.data._id) {
                onCreate(res.data); // notify parent
                setName("");
            } else {
                alert("Unexpected response. Project not created.");
                console.error("Unexpected response:", res.data);
            }
        } catch (err) {
            console.error("Error creating project:", err);
            alert("Failed to create project. Make sure you're logged in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded-lg">
            <label className="block mb-2 text-gray-700 font-medium">Project Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-3"
                placeholder="Enter project name"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Project"}
            </button>
        </form>
    );
};

export default ProjectForm;
