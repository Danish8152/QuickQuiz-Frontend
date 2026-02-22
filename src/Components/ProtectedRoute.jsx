import { useEffect } from "react";

function ProtectedRoute({ children, openLogin }) {
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (!user) {
            openLogin();
        }
    }, [user, openLogin]);

    if (!user) {
        return null;
    }

    return children;
}

export default ProtectedRoute;
