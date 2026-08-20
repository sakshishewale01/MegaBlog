import { useEffect, useState } from "react";

import appwriteService from "../appwrite/config.js";
import PostCard from "../components/PostCard.jsx";
import Container from "../components/container/Container.jsx";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response =
                    await appwriteService.getPosts();

                setPosts(
                    response?.rows ||
                    response?.documents ||
                    []
                );
            } catch (err) {
                console.error(err);

                setError(
                    "Unable to load blogs right now."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="py-16 bg-slate-50">
            <Container>

                <div className="flex items-end justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Discover
                        </p>

                        <h2 className="mt-2 text-4xl font-black text-slate-900">
                            Latest Stories
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Fresh ideas from the MegaBlog
                            community.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-96 rounded-2xl bg-white border border-slate-200 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-600">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    posts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-5">
                                ✍️
                            </div>

                            <h3 className="text-2xl font-bold">
                                No blogs yet
                            </h3>

                            <p className="mt-2 text-slate-500">
                                Be the first person to
                                publish a story.
                            </p>
                        </div>
                    )}

                {!loading &&
                    posts.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.$id}
                                    {...post}
                                />
                            ))}
                        </div>
                    )}
            </Container>
        </section>
    );
}

export default AllPost;