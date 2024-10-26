import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

export default function TotalInvoice() {
    const [showDiscount, setShowDiscount] = useState(false);
    const [showShipping, setShowShipping] = useState(false);

    const toggleDiscount = () => setShowDiscount(!showDiscount);
    const toggleShipping = () => setShowShipping(!showShipping);

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center border border-yellow-500 rounded-full p-2">
                <span className="font-medium flex-grow">Subtotal</span>
                <span className="text-blue-800">0.00</span>
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
                <input type="text" className="flex-1 focus:outline-none text-right" />
                <button onClick={toggleDiscount}>
                  <AiOutlineMinus className="text-red-500 text-lg" />
                </button>
              </div>
              
            )}

            {showShipping && (
                <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                    <span className="font-medium">Shipping</span>
                    <input type="text" className="flex-1 focus:outline-none text-right" />
                    <button onClick={toggleShipping} >
                        <AiOutlineMinus className="text-red-500 text-lg " />
                    </button>
                </div>
            )}

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Taxable Value</span>
                <input type="text" className="flex-1 focus:outline-none text-right" />
                <span className="font-medium">%</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-800">0.00</span>
            </div>

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Amount Paid</span>
                <input type="text" className="flex-1 focus:outline-none text-right" />
            </div>

            <div className="flex items-center space-x-2 border border-yellow-500 rounded-full p-2">
                <span className="font-medium">Balance Due</span>
                <input type="text" className="flex-1 focus:outline-none text-right" />
            </div>
        </div>
    );
}
