import React from 'react';

export default function TextArea({ label, placeholder }) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            <label className="text-gray-700 font-medium">{label}</label>
            <textarea
                placeholder={placeholder}
                className="border rounded-xl p-4 border-orange-300 h-32 focus:outline-none focus:border-orange-500"
            />
        </div>
    );
}