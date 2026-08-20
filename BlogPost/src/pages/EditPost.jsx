import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import appwriteService from "../appwrite/config.js";
import PostForm from "../components/post-form/PostForm.jsx";
import Container from "../components/container/Container.jsx";

function EditPost() {
    const { slug } = useParams();

    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                navigate("/");
                return;
            }

            const result =
                await appwriteService.getPost(slug);

            if (result) {
                setPost(result);
            } else {
                navigate("/");
            }

            setLoading(false);
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-slate-500">
                    Loading editor...
                </p>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <section className="py-12 bg-slate-50 min-h-[80vh]">
            <Container>

                <div className="mb-8">
                    <Link
                        to={`/post/${post.$id}`}
                        className="text-sm font-semibold text-indigo-600"
                    >
                        ← Back to blog
                    </Link>

                    <h1 className="mt-4 text-4xl font-black text-slate-900">
                        Edit Blog
                    </h1>
                </div>

                <PostForm post={post} />

            </Container>
        </section>
    );
}

export default EditPost;