import React from "react";

const TextArea = ({ label, placeholder }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold">{label}</label>
            <textarea
                rows="4"
                placeholder={placeholder}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
};

export default TextArea;
