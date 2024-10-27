
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [{ description: '', quantity: '', rate: '', amount: 0 }],
  discount: 0,
  shipping: 0,
  tax: 0,
  amountPaid: 0,
  data: {
    terms: '',
    footNote: '',
    companyInfo: {
      logo: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      from: '',
      to: '',
    },
  },
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state) => {
      state.items.push({ description: '', quantity: '', rate: '', amount: 0 });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((_, i) => i !== action.payload);
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
    setAmountPaid: (state, action) => {
      state.amountPaid = action.payload;
    },
    updateItem: (state, action) => {
      const { index, field, value } = action.payload;
      state.items[index][field] = value;
      if (field === 'quantity' || field === 'rate') {
        const quantity = parseFloat(state.items[index].quantity) || 0;
        const rate = parseFloat(state.items[index].rate) || 0;
        state.items[index].amount = (quantity * rate).toFixed(2);
      }
    },
    setCompanyInfo: (state, action) => {
      state.data.companyInfo = { ...state.data.companyInfo, ...action.payload };
    },
    setTerms: (state, action) => {
      state.data.terms = action.payload;
    },
    setFootNote: (state, action) => {
      state.data.footNote = action.payload;
    },
    clearInvoice: () => initialState,
  },
});

export const {
  setItems,
  addItem,
  deleteItem,
  setDiscount,
  setShipping,
  setTax,
  setAmountPaid,
  updateItem,
  setCompanyInfo,
  setTerms,
  setFootNote,
  clearInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
