import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Allpost from "./posts/Allpost";

function Home() {
    const authStatus = useSelector((state) => state.auth.status);

    if (!authStatus) {
        return (
            <div className="w-full py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to MegaBlog
                </h1>

                <p className="text-gray-600 mb-6">
                    Login or create an account to start reading and
                    creating blog posts.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-gray-200 px-6 py-3 rounded-lg"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Allpost />
        </div>
    );
}

export default Home;