import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AuthLayout({
    children,
    authentication = true,
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const authStatus = useSelector(
        (state) => state.auth.status
    );

    useEffect(() => {
        if (
            authentication &&
            !authStatus
        ) {
            navigate("/login", {
                replace: true,
                state: {
                    from: location.pathname,
                },
            });
        }

        if (
            !authentication &&
            authStatus
        ) {
            navigate("/", {
                replace: true,
            });
        }
    }, [
        authStatus,
        authentication,
        navigate,
        location.pathname,
    ]);

    if (
        authentication &&
        !authStatus
    ) {
        return null;
    }

    if (
        !authentication &&
        authStatus
    ) {
        return null;
    }

    return children;
}

export default AuthLayout;