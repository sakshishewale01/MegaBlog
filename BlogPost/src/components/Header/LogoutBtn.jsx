import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        try {
            await authService.logout();

            dispatch(logout());

            navigate("/login");
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="
                px-4
                py-2
                rounded-xl
                border
                border-slate-200
                text-slate-700
                font-medium
                transition
                hover:bg-slate-50
                hover:border-slate-300
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            {loading
                ? "Logging out..."
                : "Logout"}
        </button>
    );
}

export default LogoutBtn;