import axiosInstance from "./axiosInstance";

export const sendData = async (items, discount, shipping, tax, amountPaid,balanceDue,data) => {
    try {
        console.log('hi')
        console.log(data)
        const dataa = await axiosInstance.post('/saveToDB', { items, discount, shipping, tax, amountPaid,balanceDue,data })
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const getInvoices = async() =>{
    try {
        const dataa = await axiosInstance.get('/getInvoices')
        return dataa

    } catch (error) {
        console.log(error.response.data.message);
    }
}