import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// const fetcher = async (url: string) => {
//     try {
//         const response = await axiosInstance.get(url);
//         return response.data;
//     }
//     catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

const fetcher = (url: string) => {
    return axios.get(url).then((res) => res.data);
}

export default fetcher;