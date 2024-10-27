import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const TotalInvoice = ({ items, discount, shipping, tax, amountPaid, setDiscount, setShipping, setTax, setAmountPaid }) => {
    const [showDiscount, setShowDiscount] = useState(false);
    const [showShipping, setShowShipping] = useState(false);

    const toggleDiscount = () => setShowDiscount(!showDiscount);
    const toggleShipping = () => setShowShipping(!showShipping);

    // Calculate subtotal
    const subtotal = items.reduce((total, item) => {
        const itemTotal = (parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)) || 0;
        return total + itemTotal;
    }, 0);

    // Calculate total
    const total = subtotal - discount + shipping + (subtotal * (tax / 100));

    // Calculate balance due
    const balanceDue = total - amountPaid;

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center border border-yellow-500 rounded-full p-2">
                <span className="font-medium flex-grow">Subtotal</span>
                <span className="text-blue-800">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center space-x-4 text-red-400">
                <button className="flex items-center space-x-1" onClick={toggleDiscount}>
                    <AiOutlinePlus className="text-lg" />
                    <span>Discounts</span>
                </button>
                <button className="flex items-center space-x-1" onClick={toggleShipping}>
                    <AiOutlinePlus className="text-lg" />
                    <span>Shipping</span>
                </button>
            </div>

            {showDiscount && (
                <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                    <span className="font-medium">Discount</span>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="flex-1 focus:outline-none text-right"
                    />
                    <button onClick={toggleDiscount}>
                        <AiOutlineMinus className="text-red-500 text-lg" />
                    </button>
                </div>
            )}

            {showShipping && (
                <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                    <span className="font-medium">Shipping</span>
                    <input
                        type="number"
                        value={shipping}
                        onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                        className="flex-1 focus:outline-none text-right"
                    />
                    <button onClick={toggleShipping}>
                        <AiOutlineMinus className="text-red-500 text-lg" />
                    </button>
                </div>
            )}

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Taxable Value</span>
                <input
                    type="number"
                    value={tax}
                    onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    className="flex-1 focus:outline-none text-right"
                />
                <span className="font-medium">%</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-800">${total.toFixed(2)}</span>
            </div>

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Amount Paid</span>
                <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                    className="flex-1 focus:outline-none text-right"
                />
            </div>

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Balance Due</span>
                <span className="flex-1 text-right text-blue-800">${balanceDue.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default TotalInvoice;
