import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument'; 
import { sendData } from '../Api/apis';

const InvoicePdf = ({ items, discount, shipping, tax, amountPaid, data ,balanceDue}) => {

    
    const total = (items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0) - discount + shipping + (items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0) * (tax / 100))).toFixed(2);
    console.log("amountPaid",amountPaid)
    const sendDataToDB = async () => {
        try {
          console.log(data)
            const res = await sendData(items, discount, shipping, tax, amountPaid,balanceDue,data);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
       
        <PDFDownloadLink 
            document={<InvoiceDocument items={items} discount={discount} shipping={shipping} tax={tax} amountPaid={amountPaid} total={total} data={data} balanceDue={balanceDue} />} 
            fileName="invoice.pdf"
            className="bg-purple-700 text-white py-2 px-4 rounded-md"
            onClick={sendDataToDB}
        >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Save & Download PDF')}
        </PDFDownloadLink>
    );
};

export default InvoicePdf;
