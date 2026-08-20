import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostForm from "../components/PostForm";
import postService from "../appwrite/postService";

function EditPost() {
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
            <div className="w-full py-8 text-center">
                <h1 className="text-xl">
                    Loading post...
                </h1>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <PostForm post={post} />
        </div>
    ) : null;
}

export default EditPost;