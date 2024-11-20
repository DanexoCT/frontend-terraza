import axios from 'axios';

export const fetchUserProfile = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/customers/profile', {
            withCredentials: true,
        });
        return response.data.profileData; // Retorna toda la información del perfil, incluyendo los puntos
    } catch (error) {
        console.error('Error al cargar el perfil', error);
        throw error;
  }
};