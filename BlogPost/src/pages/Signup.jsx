import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userData = await authService.createAccount({
                name,
                email,
                password,
            });

            if (userData) {
                dispatch(login({ userData }));
                navigate("/");
            }
        } catch (error) {
            console.log("Signup error:", error);
            setError(error.message || "Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSignup}>

                    <div className="mb-4">
                        <label className="block mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border p-3 rounded"
                        />
                    </div>

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
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;