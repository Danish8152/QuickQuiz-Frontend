import { useState } from "react";
import "../Style/Signin.css"
import SignIn from "./SignIn";

function SignUp({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignIn, setShowSignIn] = useState(false);

    // Use environment variable for API URL
    const API_URL = import.meta.env.VITE_API_URL || "https://quickquiz-backend-3kix.onrender.com/api/auth";

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            alert(data.message);
            // Optional: Clear form after successful signup
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Signup error:", error);
            alert("Failed to connect to server");
        }
    };

    if (showSignIn) {
        return <SignIn onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 outer-f-div">
            <div className=" bg-black rounded-2xl p-6 w-96 outer-s-div">
                <div className="loginandCancle signupandcancle">
                    <h2>User registration</h2>
                    <span className="canclebutton" onClick={onClose}>+</span>
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="inputts"
                        required
                    />
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
                    <button
                        type="submit"
                        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 signupbtn"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex flex-col space-y-4 mt-4">
                    <p>
                        Already have an account <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => setShowSignIn(true)}>
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
