import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey="no-api-key"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "media",
                                "preview",
                                "searchreplace",
                                "fullscreen",
                                "code",
                                "help",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic underline | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist | " +
                                "link image media | " +
                                "code fullscreen",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;