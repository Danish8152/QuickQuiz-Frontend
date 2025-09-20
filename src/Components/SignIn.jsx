import { useState } from "react";

function SignIn({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

            alert(data.message || "Login successful ✅");
            onClose();
        } catch (err) {
            console.error("❌ SignIn error:", err);
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-primary bg-black rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSignIn}>
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
                        Sign In
                    </button>
                </form>

                <div className="flex flex-col space-y-4 mt-4">
                    <p
                        className="link-primary fs-6 cursor-pointer"
                        onClick={() => alert("Forgot password flow coming soon!")}
                    >
                        Forget password?
                    </p>
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

export default SignIn;
