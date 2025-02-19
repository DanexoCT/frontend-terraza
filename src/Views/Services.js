import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL_APP;

export const fetchUserProfile = async () => {
    try {
        const token = localStorage.getItem('sanctum_token'); // Obtener el token desde localStorage (ajusta si es necesario)

        // Verifica si el token existe antes de realizar la solicitud
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.get(`${apiUrl}/customer-perfil`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true, // Si estás usando cookies, mantén esto
        });

        // Asegúrate de que la respuesta tiene la estructura correcta
        return response.data;  // Retorna la respuesta completa o solo los datos del perfil
    } catch (error) {
        console.error('Error al cargar el perfil', error);
        throw error;  // O podrías retornar un mensaje de error más amigable
    }
};
