import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ItemTable() {
    const [items, setItems] = useState([
        { description: "", quantity: "", rate: "", amount: "0.00" },
    ]);

    const handleAddItem = () => {
        setItems([
            ...items,
            { description: "", quantity: "", rate: "", amount: "0.00" },
        ]);
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        setItems(
            items.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto mt-4">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="text-blue-900 font-semibold text-left">
                        <th className="border-b p-2">#</th>
                        <th className="border-b p-2">Item</th>
                        <th className="border-b p-2">Quantity</th>
                        <th className="border-b p-2">Rate</th>
                        <th className="border-b p-2 text-right">Amount</th>
                        <th className="border-b p-2 text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr
                            key={index}
                            className={
                                index % 2 === 0
                                    ? "bg-gray-50 hover:bg-gray-300"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }
                        >
                            <td className="p-2 text-left">{index + 1}</td>

                            <td className="p-2">
                                <input
                                    type="text"
                                    placeholder="Description of service or product"
                                    className="w-full border p-2 rounded-md border-orange-300 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td className="p-2">
                                <input
                                    min={1}
                                    type="number"
                                    placeholder="Quantity"
                                    className="w-full border p-2 rounded-md border-orange-300 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td className="p-2">
                                <input
                                    min={1}
                                    type="number"
                                    placeholder="Rate"
                                    className="w-full border p-2 rounded-md border-orange-300 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    value={item.rate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "rate",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td className="p-2 text-right pr-4">{item.amount}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="w-4 h-4"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="h-4 w-4 text-red-500 hover:text-red-600"
                                        title="Delete"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleAddItem}
                className="mt-4 px-4 py-2 bg-purple-500 text-white font-semibold rounded-3xl"
            >
                + Add Item
            </button>
        </div>
    );
}
