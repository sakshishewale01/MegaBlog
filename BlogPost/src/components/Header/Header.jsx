import { useState } from "react";
import {
    Link,
    NavLink,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Logo from "../logo.jsx";
import Container from "../container/Container.jsx";
import LogoutBtn from "./LogoutBtn.jsx";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const authStatus = useSelector(
        (state) => state.auth.status
    );

    const user = useSelector(
        (state) => state.auth.userData
    );

    const navClass = ({ isActive }) =>
        `font-medium transition ${
            isActive
                ? "text-indigo-600"
                : "text-slate-600 hover:text-indigo-600"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <Container>

                {/* Main Header */}
                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/">
                        <Logo />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden text-2xl text-slate-700"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-7">

                        {/* Home */}
                        <NavLink
                            to="/"
                            className={navClass}
                        >
                            Home
                        </NavLink>

                        {/* Explore */}
                        <NavLink
                            to="/all-posts"
                            className={navClass}
                        >
                            Explore
                        </NavLink>

                        {/* Write */}
                        {authStatus && (
                            <NavLink
                                to="/add-post"
                                className={navClass}
                            >
                                Write
                            </NavLink>
                        )}

                        {/* Logged Out */}
                        {!authStatus ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className={navClass}
                                >
                                    Login
                                </NavLink>

                                <Link
                                    to="/signup"
                                    className="
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        bg-indigo-600
                                        text-white
                                        font-semibold
                                        hover:bg-indigo-700
                                        transition
                                    "
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            /* Logged In */
                            <div className="flex items-center gap-4">

                                {/* User Information */}
                                <div className="hidden lg:block">
                                    <p className="text-xs text-slate-400">
                                        Welcome
                                    </p>

                                    <p className="font-semibold text-slate-800">
                                        {user?.name ||
                                            "Writer"}
                                    </p>
                                </div>

                                {/* Logout Button */}
                                <LogoutBtn />

                            </div>
                        )}
                    </nav>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="md:hidden pb-5 flex flex-col gap-4">

                        {/* Home */}
                        <NavLink
                            to="/"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                            className={navClass}
                        >
                            Home
                        </NavLink>

                        {/* Explore */}
                        <NavLink
                            to="/all-posts"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                            className={navClass}
                        >
                            Explore
                        </NavLink>

                        {/* Write */}
                        {authStatus && (
                            <NavLink
                                to="/add-post"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className={navClass}
                            >
                                Write
                            </NavLink>
                        )}

                        {/* Login / Signup */}
                        {!authStatus ? (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className={navClass}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className={navClass}
                                >
                                    Signup
                                </NavLink>
                            </>
                        ) : (
                            /* Mobile Logout */
                            <LogoutBtn />
                        )}
                    </nav>
                )}

            </Container>
        </header>
    );
}

export default Header;