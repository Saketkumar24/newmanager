import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User } from "lucide-react";
import { useEffect } from "react";
const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        if (isLoggedIn && window.location.pathname === "/register") {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="top-0 left-0 right-0 bg-blue-600 text-white px-4 py-4 shadow-md z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold hover:text-white">
                    TaskFlow
                </Link>

                <div className="space-x-4 flex items-center">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="hover:underline flex items-center">
                                <UserPlus className="w-5 h-5 mr-1" />
                                Register
                            </Link>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
