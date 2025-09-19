import { useState } from "react";

function SignIn({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                onClose(); // close modal
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-primary px-4 py-4  bg-black rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form className="flex flex-col space-y-4 gap-3" onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
                    >
                        Sign In
                    </button>
                </form>
                <div className="flex flex-col space-y-4 gap-3 mt-2">
                    <div>
                        <p className="link-primary fs-6" style={{ cursor: "pointer" }}>Forget password ?</p>
                    </div>
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
