import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({
    name = "content",
    control,
    label,
    defaultValue = "",
    apiKey,
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                rules={{
                    required: "Content is required",
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <>
                        <Editor
                            apiKey={apiKey}
                            value={value ?? defaultValue}
                            onEditorChange={onChange}
                            init={{
                                height: 500,
                                menubar: true,

                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],

                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic underline | " +
                                    "alignleft aligncenter alignright | " +
                                    "bullist numlist | " +
                                    "link image media table | " +
                                    "code fullscreen",

                                content_style: `
                                    body {
                                        font-family:
                                            Inter,
                                            Arial,
                                            sans-serif;
                                        font-size: 16px;
                                        line-height: 1.7;
                                        padding: 10px;
                                    }
                                `,
                            }}
                        />

                        {error && (
                            <p className="mt-2 text-sm text-red-500">
                                {error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
}

export default RTE;