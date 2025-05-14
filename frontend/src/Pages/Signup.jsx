import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        country: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password.length < 4) {
                throw new Error("Password should have atleast 4 characters");

            }
            await axios.post(`${import.meta.env.VITE_URI}/api/users/register`, formData);
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            err.response ? alert(err.response.data.message) : alert(err.message)
        }
    };

    return (
        <>
            <div className="pt-20 min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-violet-300 px-6">
                <div className="md:w-1/2 text-white p-6 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Organize Today, Achieve Tomorrow</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Task management isn't just ticking boxes—it's your roadmap to clarity, focus, and unstoppable productivity.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>🗂️ Organize projects effortlessly</li>
                        <li>📅 Set deadlines and reminders</li>
                        <li>🚀 Boost your personal & team efficiency</li>
                        <li>📈 Track your progress over time</li>
                    </ul>
                </div>

                <div className="md:w-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto">
                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Create Your Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Your Country"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all font-semibold"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center mt-4 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
