import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({
    $id,
    title,
    featuredImage,
    content,
    $createdAt,
}) {
    const imageUrl = featuredImage
        ? appwriteService
              .getFilePreview(featuredImage)
              .toString()
        : "";

    const excerpt = content
        ?.replace(/<[^>]+>/g, "")
        ?.slice(0, 120);

    return (
        <Link
            to={`/post/${$id}`}
            className="group block h-full"
        >
            <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Image */}
                <div className="h-56 overflow-hidden bg-slate-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">

                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
                        Blog
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition">
                        {title}
                    </h2>

                    {excerpt && (
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            {excerpt}...
                        </p>
                    )}

                    <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                        <span>
                            Read article →
                        </span>

                        {$createdAt && (
                            <span>
                                {new Date(
                                    $createdAt
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default PostCard;