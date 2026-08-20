function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`
                    w-full
                    px-4 py-3
                    rounded-xl
                    border
                    bg-white
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    ${
                        error
                            ? "border-red-400"
                            : "border-slate-200"
                    }
                    ${className}
                `}
                {...props}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;