import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL_APP;


const api = axios.create({
    baseURL: apiUrl,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const fetchCoupons = async () => {
    try {
        const response = await api.get(`/coupons/`);
        return response.data.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('No Autorizado');
        }
        throw new Error('Error al obtener los cupones');
    }
};

export const redeemCoupon = async (couponId) => {
    try {
        const response = await api.post(`/canjear/${couponId}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Error al canjear cupón';
        throw new Error(message);
    }
};

export const getRedeemedCoupons = async (customerId, token) => {
    try {
        const response = await api.get(`/customer/${customerId}/coupons`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.cupones || [];
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('No Autorizado');
        }
        throw new Error('Error al obtener los cupones canjeados');
    }
}