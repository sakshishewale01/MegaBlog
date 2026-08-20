import { Link } from "react-router-dom";

import PostForm from "../components/post-form/PostForm.jsx";
import Container from "../components/container/Container.jsx";

function AddPost() {
    return (
        <section className="py-12 bg-slate-50 min-h-[80vh]">
            <Container>

                <div className="mb-8">
                    <Link
                        to="/"
                        className="text-sm font-semibold text-indigo-600"
                    >
                        ← Back to home
                    </Link>

                    <h1 className="mt-4 text-4xl font-black text-slate-900">
                        Write a New Blog
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Share something valuable with
                        the MegaBlog community.
                    </p>
                </div>

                <PostForm />

            </Container>
        </section>
    );
}

export default AddPost;