import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import appwriteService from "../../appwrite/config.js";

import Button from "../Button.jsx";
import Input from "../input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";

function PostForm({ post }) {
    const navigate = useNavigate();

    const userData = useSelector(
        (state) => state.auth.userData
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const title = watch("title");

    useEffect(() => {
        if (!post && title) {
            setValue(
                "slug",
                appwriteService.createSlug(title)
            );
        }
    }, [title, post, setValue]);

    const submitPost = async (data) => {
        setError("");
        setLoading(true);

        let uploadedFile = null;

        try {
            if (!userData?.$id) {
                throw new Error(
                    "You must be logged in to create a post."
                );
            }

            let featuredImage =
                post?.featuredImage || "";

            // Upload new image
            if (data.image?.[0]) {
                uploadedFile =
                    await appwriteService.uploadFile(
                        data.image[0]
                    );

                if (!uploadedFile) {
                    throw new Error(
                        "Image upload failed."
                    );
                }

                featuredImage =
                    uploadedFile.$id;
            }

            if (post) {
                // UPDATE
                const updatedPost =
                    await appwriteService.updatePost(
                        post.$id,
                        {
                            title: data.title,
                            content: data.content,
                            featuredImage,
                            status: data.status,
                        }
                    );

                if (!updatedPost) {
                    throw new Error(
                        "Unable to update post."
                    );
                }

                // Delete old image if replaced
                if (
                    data.image?.[0] &&
                    post.featuredImage
                ) {
                    await appwriteService.deleteFile(
                        post.featuredImage
                    );
                }

                navigate(`/post/${post.$id}`);
            } else {
                // CREATE
                const newPost =
                    await appwriteService.createPost({
                        title: data.title,
                        content: data.content,
                        featuredImage,
                        status: data.status,
                        userId: userData.$id,
                    });

                if (!newPost) {
                    throw new Error(
                        "Unable to create post."
                    );
                }

                navigate(`/post/${newPost.$id}`);
            }
        } catch (err) {
            console.error(err);

            // If database creation fails after image upload,
            // remove the uploaded image.
            if (uploadedFile?.$id) {
                await appwriteService.deleteFile(
                    uploadedFile.$id
                );
            }

            setError(
                err.message ||
                    "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="grid lg:grid-cols-3 gap-8"
        >
            <div className="lg:col-span-2 space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Input
                        label="Blog Title"
                        placeholder="Enter an interesting title..."
                        {...register("title", {
                            required:
                                "Title is required",
                        })}
                        error={
                            errors.title?.message
                        }
                    />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Input
                        label="Slug"
                        value={
                            post?.$id ||
                            appwriteService.createSlug(
                                title || ""
                            )
                        }
                        readOnly
                        className="bg-slate-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                        This is automatically generated
                        from your title.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={post?.content || ""}
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    />
                </div>
            </div>

            <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h3 className="font-bold text-slate-900 mb-4">
                        Publish Settings
                    </h3>

                    <div className="space-y-5">

                        <Input
                            label="Featured Image"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            {...register("image")}
                        />

                        {post?.featuredImage && (
                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">
                                    Current image
                                </p>

                                <img
                                    src={appwriteService
                                        .getFilePreview(
                                            post.featuredImage
                                        )
                                        .toString()}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            </div>
                        )}

                        <Select
                            label="Status"
                            options={[
                                {
                                    value: "active",
                                    label: "Published",
                                },
                                {
                                    value: "inactive",
                                    label: "Draft",
                                },
                            ]}
                            {...register("status", {
                                required: true,
                            })}
                        />

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading
                                ? post
                                    ? "Updating..."
                                    : "Publishing..."
                                : post
                                    ? "Update Blog"
                                    : "Publish Blog"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostForm;