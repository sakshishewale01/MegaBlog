import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../appwrite/auth.js";
import { login } from "../store/authSlice.js";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await authService.login({
                email,
                password,
            });

            const userData =
                await authService.getCurrentUser();

            if (userData) {
                dispatch(
                    login({
                        userData,
                    })
                );

                navigate(
                    location.state?.from || "/",
                    {
                        replace: true,
                    }
                );
            }
        } catch (err) {
            setError(
                err.message ||
                    "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Login to continue to MegaBlog.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                    {error && (
                        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-slate-500">
                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-600 hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;