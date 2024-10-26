import './index.css';
import CompanyInfo from './Components/CompanyInfo';
import ItemTable from './Components/ItemTable';
import TotalInvoice from './Components/TotalInvoice';
import Overview from './Components/Overview';
import { useState } from 'react';

function App() {
  return (
    <>
      <div className="min-h-screen p-5 bg-grey-100">
        <div className="flex justify-between items-center">
          <img src="./Screenshot 2024-10-24 152830.png" alt="finline-logo" className="w-40" />
          <div className="flex space-x-4 items-center">
            <button type="button" className="bg-blue-700 px-4 py-2 rounded-3xl text-white">Sign in</button>
            <span className="text-sm">English<span> ^ </span></span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-4">
          <CompanyInfo />
          <ItemTable />
          <div className="flex justify-between mt-6 space-x-4">
            <div className="w-1/2">
              <Overview />
            </div>
            <div className="w-1/2">
              <TotalInvoice />
            </div>
          </div>
          <div className="flex justify-center mt-5 space-x-3">
            <button className="bg-purple-700 text-white py-2 px-4 rounded-md">Download PDF</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">Clear</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
