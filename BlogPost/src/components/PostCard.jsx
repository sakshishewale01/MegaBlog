import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">

        <div className="w-full h-48 overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>

      </div>
    </Link>
  );
}

export default PostCard;