import { useEffect, useState } from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import authService from "./appwrite/auth.js";
import {
    login,
    logout,
} from "./store/authSlice.js";

import {
    Header,
    Footer,
    AuthLayout,
} from "./components";

import Home from "./pages/Home.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
    const dispatch = useDispatch();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData =
                    await authService.getCurrentUser();

                if (userData) {
                    dispatch(
                        login({
                            userData,
                        })
                    );
                } else {
                    dispatch(logout());
                }
            } catch {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <div className="text-4xl font-black">
                        MegaBlog
                    </div>

                    <p className="mt-3 text-slate-400">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">

            <Header />

            <main className="flex-grow">

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/all-posts"
                        element={<AllPost />}
                    />

                    <Route
                        path="/post/:slug"
                        element={<Post />}
                    />

                    <Route
                        path="/login"
                        element={
                            <AuthLayout
                                authentication={false}
                            >
                                <Login />
                            </AuthLayout>
                        }
                    />

                    <Route
                        path="/signup"
                        element={
                            <AuthLayout
                                authentication={false}
                            >
                                <Signup />
                            </AuthLayout>
                        }
                    />

                    <Route
                        path="/add-post"
                        element={
                            <AuthLayout>
                                <AddPost />
                            </AuthLayout>
                        }
                    />

                    <Route
                        path="/edit-post/:slug"
                        element={
                            <AuthLayout>
                                <EditPost />
                            </AuthLayout>
                        }
                    />

                    <Route
                        path="*"
                        element={<Home />}
                    />

                </Routes>

            </main>

            <Footer />

        </div>
    );
}

export default App;