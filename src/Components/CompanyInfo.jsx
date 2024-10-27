import React, { useState } from "react";
import TextArea from "./TextArea";
import toast from "react-hot-toast";

const CompanyInfo = ({ onChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState({
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        from: '',
        to: ''
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            console.log(file)
            setSelectedImage(imageURL);
            handleInputChange('logo', imageURL); 
        }else{
            toast.error('add image')
        }
    };

    const openFileSelector = () => {
        document.getElementById('hiddenFileInput').click();
    };

    const handleInputChange = (name, value) => {
        onChange({ [name]: value }); 
    };
    

    return (
        <div className="border-b">
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-center">
                    <input id="hiddenFileInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    <div onClick={openFileSelector} className="bg-gray-100 p-2 w-80 h-40 flex items-center justify-center cursor-pointer border border-gray-300 rounded-md">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" className="h-full w-full object-cover rounded-md" />
                        ) : (
                            <p className="text-gray-500 font-bold">Click to add company logo</p>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center border border-yellow-500 rounded-full p-2">
                        <div className="pr-2 text-black">INVOICE</div>
                        <input
                            type="text"
                            placeholder="#"
                            className="flex-grow border-none outline-none pl-2 rounded-md"
                            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center border border-yellow-500 rounded-full p-2">
                        <label htmlFor="invoiceDate" className="pr-2 text-black">Invoice date</label>
                        <input
                            name="invoiceDate"
                            type="date"
                            className="flex-grow border-none outline-none pl-2"
                            onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center border border-yellow-500 rounded-full p-2">
                        <label htmlFor="dueDate" className="pr-2 text-black">Due date</label>
                        <input
                            name="dueDate"
                            type="date"
                            className="flex-grow border-none outline-none pl-2"
                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between space-x-4 mt-4">
                <TextArea
                    label="Invoice from"
                    placeholder="Who is this invoice from?"
                    onChange={(value) => handleInputChange('from', value)}
                />
                <TextArea
                    label="Invoice to"
                    placeholder="Who is this invoice to?"
                    onChange={(value) => handleInputChange('to', value)}
                />
            </div>
            <hr className="my-3" />
        </div>
    );
};

export default CompanyInfo;
