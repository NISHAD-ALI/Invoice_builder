// import axios from "axios";

// const axiosInstance  = axios.create({
//     baseURL : "http://localhost:3000",
//     withCredentials : true
// })

// export default axiosInstance
import axios from "axios";

const axiosInstance  = axios.create({
    baseURL : "https://invoicegenerator.up.railway.app/",
    withCredentials : true
})

export default axiosInstance