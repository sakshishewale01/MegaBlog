import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-2"
        >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                M
            </div>

            <span className="text-2xl font-black tracking-tight text-slate-900">
                Mega<span className="text-indigo-600">Blog</span>
            </span>
        </Link>
    );
}

export default Logo;