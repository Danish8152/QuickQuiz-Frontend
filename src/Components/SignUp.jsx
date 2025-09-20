import { useState } from "react";

function SignUp({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-primary bg-black rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">User Registration</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="flex flex-col space-y-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full border py-2 rounded hover:bg-gray-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
