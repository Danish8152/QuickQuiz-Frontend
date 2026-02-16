import { useState } from "react";
import "../Style/Signin.css"
import SignUp from "./SignUp";

function SignIn({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);

    // Use environment variable for backend API
    const API_URL = import.meta.env.VITE_API_URL || "https://quickquiz-backend-3kix.onrender.com/api/auth";

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // safely parse JSON response
            const contentType = res.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                const text = await res.text();
                throw new Error(text || "Unknown server error");
            }

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Store token if you want to use it later
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message || "Login successful || Refresh the page for access ");
            onClose();
        } catch (err) {
            console.error("❌ SignIn error:", err);
            alert(err.message);
        }
    };

    if (showSignUp) {
        return <SignUp onClose={onClose} />;
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 outer-f-div">
            <div className=" bg-black rounded-2xl p-6 w-96 outer-s-div">
                <div className="loginandCancle">
                    <h2>Login</h2>
                    <span className="canclebutton" onClick={onClose}>+</span>
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputts"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputts"
                        required
                    />

                    <p
                        className="link-primary fs-6 cursor-pointer"
                        onClick={() => alert("Forgot password flow coming soon!")}
                    >
                        Forget password ?
                    </p>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                    >
                        Login
                    </button>
                </form>

                <div className="flex flex-col space-y-4 mt-4">
                    <p>
                        Don't have an account <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => setShowSignUp(true)}
                        >
                            Create new
                        </span>

                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
