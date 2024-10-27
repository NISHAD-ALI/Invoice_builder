import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './index.css'
import InvoiceGenerator from "./Pages/InvoiceGenerator";
import Previous from "./Pages/PreviousInvoices";
function App() {
  return (
<div>
<Toaster position="top-right" />
   <Router>
    <Routes>
    <Route path="/" element={<InvoiceGenerator />} />
    <Route path="/prev*" element={<Previous />} />
    </Routes>
   </Router>
   </div>
  )
}

export default App

  