import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import postService from "../appwrite/postService";

function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            postService
                .getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="w-full py-10 text-center">
                <h1 className="text-xl">
                    Loading post...
                </h1>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="w-full py-10 text-center">
                <h1 className="text-2xl font-bold">
                    Post not found
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <div className="container mx-auto px-4">
                
                <div className="mb-6">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full max-h-[500px] object-cover rounded-xl"
                    />
                </div>

                <h1 className="text-4xl font-bold mb-6">
                    {post.title}
                </h1>

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                />
            </div>
        </div>
    );
}

export default Post;