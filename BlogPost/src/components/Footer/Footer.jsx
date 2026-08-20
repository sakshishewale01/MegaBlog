import { Link } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../logo";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 mt-20">
            <Container>
                <div className="py-12 grid md:grid-cols-3 gap-10">

                    <div>
                        <Logo />

                        <p className="mt-4 text-sm leading-6 text-slate-400">
                            MegaBlog is a modern blogging platform
                            where people can write, discover and
                            share ideas.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <Link
                                to="/"
                                className="hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                to="/all-posts"
                                className="hover:text-white"
                            >
                                Explore Blogs
                            </Link>

                            <Link
                                to="/add-post"
                                className="hover:text-white"
                            >
                                Write a Blog
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">
                            MegaBlog
                        </h3>

                        <p className="text-sm text-slate-400">
                            Built with React, Redux Toolkit,
                            Appwrite, TinyMCE and Tailwind CSS.
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                    © 2026 MegaBlog. Built with React.
                </div>
            </Container>
        </footer>
    );
}

export default Footer;