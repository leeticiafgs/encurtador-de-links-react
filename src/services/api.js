import axios from "axios";

export const key="12ba6c47dc08fc82307da9e4656574173fd50dd1";

const api=axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4/',
    headers:{
        'Authorization': `Bearer ${key}`

    }
})

export default api;





