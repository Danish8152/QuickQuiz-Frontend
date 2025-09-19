import { Pointer } from "lucide-react";
import { Cursor } from "mongoose";


function SignIn({ onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-primary px-4 py-4  bg-black rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form className="flex flex-col space-y-4 gap-3">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
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
                        <p className="link-primary fs-6" style={{cursor:"pointer"}}>Forget password ?</p>
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
