function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center
                px-5 py-2.5
                rounded-xl
                font-semibold
                transition-all duration-200
                ${bgColor}
                ${textColor}
                ${
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:-translate-y-0.5 hover:shadow-lg"
                }
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;