import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemTable = ({ items, onItemChange, onAddItem, onDeleteItem }) => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-4 overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="font-semibold text-left">
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
                    index % 2 === 0 ? "bg-gray-50 hover:bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
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
                        onItemChange(index, "description", e.target.value)
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
                        onItemChange(index, "quantity", e.target.value)
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
                        onItemChange(index, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2 text-right pr-4">
                    {parseFloat(item.amount || 0).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDeleteItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6" className="text-left">
                  <button
                    onClick={onAddItem}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Add Item
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
      
};

export default ItemTable;

