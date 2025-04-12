import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_APP;

export const getCustomerProfile = async () => {

    const token = localStorage.getItem('auth_token'); // Obtener el token desde localStorage

    if (!token) throw new Error('Sin token de autenticación');

    const response = await axios.get(`${apiUrl}/customer-perfil`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;

}

export const updateCustomerProfile = async (id, updatedData) => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Token no encontrado');

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    let dataToSend;

    if (updatedData.imagen) {
        const formData = new FormData();
        formData.append('imagen', updatedData.imagen);
        formData.append('_method', 'PUT');
        dataToSend = formData;
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        dataToSend = {
            ...updatedData,
            _method: 'PUT',
        };
        config.headers['Content-Type'] = 'application/json';
    }

    const response = await axios.post(
        `${apiUrl}/customer-update`,
        dataToSend,
        config,
    );

    return response.data;
};