import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument'; 
import { sendData } from '../Api/apis';
import toast from 'react-hot-toast';

const InvoicePdf = ({ items, discount, shipping, tax, amountPaid, data, balanceDue }) => {
    const [errors, setErrors] = useState({});
    // state to hid save&download button when there is an error   
    const [isValid, setIsValid] = useState(true); 

    const total = (
        items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0) - discount + shipping + 
        (items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0) * (tax / 100))
    ).toFixed(2);

    const validateForm = () => {

        const formErrors = {};
        if (items.length === 0) {
            formErrors.items = 'At least one item is required';
        } else {
            items.forEach((item, index) => {
                if (!item.description) {
                    formErrors[`items-${index}-description`] = 'Description is required';
                }
                if (!item.quantity || item.quantity <= 0) {
                    formErrors[`items-${index}-quantity`] = 'Quantity must be greater than zero';
                }
                if (!item.rate || item.rate <= 0) {
                    formErrors[`items-${index}-rate`] = 'Rate must be greater than zero';
                }
            });
        }

        if (discount < 0) formErrors.discount = 'Discount cannot be negative';
        if (shipping < 0) formErrors.shipping = 'Shipping cannot be negative';
        if (tax < 0) formErrors.tax = 'Tax cannot be negative';
        if (amountPaid < 0) formErrors.amountPaid = 'Amount paid cannot be negative';
        if (balanceDue < 0) formErrors.balanceDue = 'Balance due cannot be negative';
        if (!data.companyInfo.invoiceNumber) formErrors.invoiceNumber = 'Invoice number is required';
        

        // checking the invoice date and due date
        const today = new Date();
        const invoiceDate = new Date(data.companyInfo.invoiceDate);
        const dueDate = new Date(data.companyInfo.dueDate);
     
        if (!data.companyInfo.invoiceDate) {
            formErrors.invoiceDate = 'Invoice date is required';
        } else if (invoiceDate < today) {
            formErrors.invoiceDate = 'Invoice date must be today or later';
        }

        if (!data.companyInfo.dueDate) {
            formErrors.dueDate = 'Due date is required';
        } else if (dueDate <= invoiceDate) {
            formErrors.dueDate = 'Due date must be after the invoice date';
        }

        if (!data.companyInfo.from) formErrors.from = 'Invoice from is required';
        if (!data.companyInfo.to) formErrors.to = 'Invoice to is required';
        if (!data.companyInfo.logo) formErrors.logo = 'Logo is required';

        setErrors(formErrors);
        setIsValid(Object.keys(formErrors).length === 0);
        return Object.keys(formErrors).length === 0;
    };

    const showErrorToasts = () => {
        Object.values(errors).forEach(errorMessage => {
            toast.error(errorMessage);
        });
    };

    const sendDataToDB = async () => {
        setErrors({});

        if (!validateForm()) {
            showErrorToasts();
            return;
        }

        try {
            const res = await sendData(items, discount, shipping, tax, amountPaid, balanceDue, data);
            console.log(res);
            toast.success('Data saved successfully');
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to save data');
        }
    };

    return (
        <div>
            {isValid ? (
                <PDFDownloadLink
                    document={<InvoiceDocument items={items} discount={discount} shipping={shipping} tax={tax} amountPaid={amountPaid} total={total} data={data} balanceDue={balanceDue} />}
                    fileName="invoice.pdf"
                    className="bg-purple-700 text-white py-2 px-4 rounded-md cursor-pointer"
                    onClick={sendDataToDB}
                >
                    {({ loading }) => (loading ? 'Generating PDF...' : 'Save & Download PDF')}
                </PDFDownloadLink>
            ) : (
                <button
                    onClick={() => {
                        validateForm();
                        showErrorToasts();
                    }}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                    Check for Errors
                </button>
            )}
        </div>
    );
};

export default InvoicePdf;
