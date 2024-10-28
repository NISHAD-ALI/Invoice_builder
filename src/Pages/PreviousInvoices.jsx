import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { getInvoices } from '../Api/apis';
import InvoiceDocument from '../Components/InvoiceDocument';
import { useNavigate } from 'react-router-dom';

const Previous = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getInvoices();
                console.log(response.data.data);
                setInvoices(response.data.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };
        fetchInvoices();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredInvoices = invoices.filter((invoice) =>
        invoice.companyInfo.invoiceNumber.includes(searchQuery) ||
        invoice.companyInfo.to.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-purple-600 text-white py-2 px-4 rounded-md"
                >
                   {` < Previous`}
                </button>
            </div>
                <h2 className="text-4xl font-bold mb-4">Previous Invoices</h2>
            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by Invoice Number or Customer"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-2 flex-grow"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Invoice Number</th>
                            <th className="border border-gray-300 p-2">Invoice Date</th>
                            <th className="border border-gray-300 p-2">Due Date</th>
                            <th className="border border-gray-300 p-2">Customer</th>
                            <th className="border border-gray-300 p-2">Total Amount</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td className="border border-gray-300 p-2">{invoice.companyInfo.invoiceNumber}</td>
                                <td className="border border-gray-300 p-2">{new Date(invoice.companyInfo.invoiceDate).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2">{new Date(invoice.companyInfo.dueDate).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2">{invoice.companyInfo.to}</td>
                                <td className="border border-gray-300 p-2">${invoice.amountPaid + invoice.balanceDue}</td>
                                <td className="border border-gray-300 p-2">
                                    <PDFDownloadLink
                                        document={<InvoiceDocument items={invoice.items} discount={invoice.discount} shipping={invoice.shipping} tax={invoice.tax} amountPaid={invoice.amountPaid} total={invoice.amountPaid + invoice.balanceDue} data={invoice} balanceDue={invoice.balanceDue} />}
                                        fileName="invoice.pdf"
                                        className="bg-purple-700 text-white py-2 px-4 rounded-md"
                                    >
                                        Download
                                    </PDFDownloadLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Previous;
