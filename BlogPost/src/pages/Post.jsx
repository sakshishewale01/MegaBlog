import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { useSelector } from "react-redux";

import parse from "html-react-parser";
import DOMPurify from "dompurify";

import appwriteService from "../appwrite/config.js";
import Container from "../components/container/Container.jsx";

function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const user = useSelector(
        (state) => state.auth.userData
    );

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

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

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        setDeleting(true);

        try {
            const deleted =
                await appwriteService.deletePost(
                    post.$id
                );

            if (deleted) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(
                        post.featuredImage
                    );
                }

                navigate("/");
            }
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-slate-500">
                    Loading blog...
                </p>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    const imageUrl = post.featuredImage
        ? appwriteService
              .getFilePreview(
                  post.featuredImage
              )
              .toString()
        : "";

    const cleanContent =
        DOMPurify.sanitize(
            post.content || ""
        );

    const isOwner =
        user?.$id &&
        post.userId === user.$id;

    return (
        <article className="py-12">
            <Container>

                <div className="max-w-4xl mx-auto">

                    <Link
                        to="/all-posts"
                        className="text-sm font-semibold text-indigo-600"
                    >
                        ← Back to blogs
                    </Link>

                    <div className="mt-8">

                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Featured Story
                        </p>

                        <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                            {post.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span>
                                Published{" "}
                                {post.$createdAt
                                    ? new Date(
                                          post.$createdAt
                                      ).toLocaleDateString(
                                          undefined,
                                          {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          }
                                      )
                                    : ""}
                            </span>

                            {isOwner && (
                                <div className="flex gap-3">
                                    <Link
                                        to={`/edit-post/${post.$id}`}
                                        className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={
                                            handleDelete
                                        }
                                        disabled={
                                            deleting
                                        }
                                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
                                    >
                                        {deleting
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            )}
                        </div>

                        {imageUrl && (
                            <div className="mt-10 rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src={imageUrl}
                                    alt={post.title}
                                    className="w-full max-h-[600px] object-cover"
                                />
                            </div>
                        )}

                        <div className="mt-10 prose prose-slate prose-lg max-w-none">
                            {parse(cleanContent)}
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    );
}

export default Post;