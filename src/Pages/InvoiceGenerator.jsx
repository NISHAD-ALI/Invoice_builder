import CompanyInfo from '../Components/CompanyInfo';
import ItemTable from '../Components/ItemTable';
import TotalInvoice from '../Components/TotalInvoice';
import Overview from '../Components/Overview';
import InvoicePdf from '../Components/InvoicePdf';
import { useSelector, useDispatch } from 'react-redux';
// dispatchd from store
import {
  addItem,
  deleteItem,
  updateItem,
  setDiscount,
  setShipping,
  setTax,
  setAmountPaid,
  setCompanyInfo,
  clearInvoice,
} from '../Redux/slice'
import { useNavigate } from 'react-router-dom';

function InvoiceGenerator() {
  const dispatch = useDispatch();
  const { items, discount, shipping, tax, amountPaid, data } = useSelector(
    (state) => state.invoice
  );
  const navigate = useNavigate()
  const handleItemChange = (index, field, value) => {
    dispatch(updateItem({ index, field, value }));
  };

  const handleCompanyInfoChange = (info) => {
    dispatch(setCompanyInfo(info));
  };

  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
  const total = (subtotal - discount + shipping + (subtotal * (tax / 100))).toFixed(2);
  const balanceDue = (total - amountPaid).toFixed(2);

  return (
    <div className="min-h-screen p-5 bg-grey-100">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <img src="./Screenshot 2024-10-24 152830.png" alt="finline-logo" className="w-40" />
        <div className="flex space-x-4 items-center mt-4 md:mt-0">
          <button type="button" className="bg-blue-700 px-4 py-2 rounded-3xl text-white">
            Sign in
          </button>
          <span className="text-sm">English<span> ^ </span></span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-4">
        <CompanyInfo onChange={handleCompanyInfoChange} />
        <ItemTable
          items={items}
          onItemChange={handleItemChange}
          onAddItem={() => dispatch(addItem())}
          onDeleteItem={(x) => dispatch(deleteItem(x))}
        />
        <div className="flex flex-col md:flex-row justify-between mt-6 space-x-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Overview data={data} />
          </div>
          <div className="w-full md:w-1/2">
            <TotalInvoice
              items={items}
              discount={discount}
              shipping={shipping}
              tax={tax}
              amountPaid={amountPaid}
              setDiscount={(x) => dispatch(setDiscount(x))}
              setShipping={(x) => dispatch(setShipping(x))}
              setTax={(x) => dispatch(setTax(x))}
              setAmountPaid={(x) => dispatch(setAmountPaid(x))}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-5 space-x-0 md:space-x-3">
          <InvoicePdf
            items={items}
            discount={discount}
            shipping={shipping}
            tax={tax}
            amountPaid={amountPaid}
            data={data}
            balanceDue={balanceDue}
          />
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mt-2 md:mt-0"
            onClick={() => dispatch(clearInvoice())}
          >
            Clear
          </button>
          <button
            className="bg-purple-700 text-white py-2 px-4 rounded-md mt-2 md:mt-0"
            onClick={() => navigate('/prev')}
          >
            Show Previous Invoices
          </button>
        </div>
      </div>
    </div>
  );  
}

export default InvoiceGenerator;
