import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AllPost from "./AllPost.jsx";
import Container from "../components/container/Container.jsx";

function Home() {
    const authStatus = useSelector(
        (state) => state.auth.status
    );

    return (
        <>
            <section className="relative overflow-hidden bg-slate-950 text-white">

                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

                <Container className="relative py-24 lg:py-32">

                    <div className="max-w-4xl">

                        <span className="inline-flex px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-semibold mb-6">
                            ✨ A place for ideas
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Write.
                            <span className="text-indigo-400">
                                {" "}Share.
                            </span>
                            <br />
                            Inspire.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Discover thoughtful articles,
                            share your knowledge and build
                            your own audience with MegaBlog.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to={
                                    authStatus
                                        ? "/add-post"
                                        : "/signup"
                                }
                                className="px-6 py-3 rounded-xl bg-indigo-600 font-bold hover:bg-indigo-500 transition"
                            >
                                {authStatus
                                    ? "Write a Blog"
                                    : "Start Writing"}
                            </Link>

                            <Link
                                to="/all-posts"
                                className="px-6 py-3 rounded-xl border border-slate-700 font-bold hover:bg-white/5 transition"
                            >
                                Explore Blogs →
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <AllPost />
        </>
    );
}

export default Home;