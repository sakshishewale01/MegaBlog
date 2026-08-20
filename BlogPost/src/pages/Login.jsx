import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const session = await authService.login({
                email,
                password,
            });

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(login({ userData }));
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("Login error:", error);
            setError(error.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="block mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600"
                    >
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;