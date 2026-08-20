function Select({
    options = [],
    label,
    className = "",
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <select
                className={`
                    w-full
                    px-4 py-3
                    rounded-xl
                    border border-slate-200
                    bg-white
                    text-slate-800
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => {
                    const value =
                        typeof option === "string"
                            ? option
                            : option.value;

                    const label =
                        typeof option === "string"
                            ? option
                            : option.label;

                    return (
                        <option
                            key={value}
                            value={value}
                        >
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default Select;