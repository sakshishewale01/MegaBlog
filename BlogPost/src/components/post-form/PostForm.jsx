import { useCallback } from "react";
import { useForm } from "react-hook-form";

import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from "./Select";

function PostForm({ post }) {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    }, []);

    const submitPost = async (data) => {
        data.slug = slugTransform(data.slug);

        if (post) {
            // Update existing post
            console.log("Update Post:", data);
        } else {
            // Create new post
            console.log("Create Post:", data);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="flex flex-wrap"
        >
            {/* Left Side */}
            <div className="w-2/3 px-2">

                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="mb-4"
                    {...register("title", {
                        required: true,
                    })}
                />

                <Input
                    label="Slug"
                    placeholder="Enter post slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true,
                    })}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            {
                                shouldValidate: true,
                            }
                        );
                    }}
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Side */}
            <div className="w-1/3 px-2">

                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {
                        required: true,
                    })}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;