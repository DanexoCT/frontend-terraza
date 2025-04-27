import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_APP;

export const loginCustomer = async (email, password) => {

    try {
        const response = await axios.post(`${apiUrl}/customer-login`, {
            email,
            password,
        });

        const token = response.data.token;
        localStorage.setItem('auth_token', token);

        return { token };
    } catch (error) {
        let message = 'Error desconocido';
        if (error.response) {
            message = error.response.data.message || 'Error de autenticación';
        } else if (error.request) {
            message = 'No se recibió respuesta del servidor.';
        } else {
            message = 'Error de conexión. Intenta nuevamente más tarde.';
        }

        throw new Error(message);
    }
}

export const loginWithGoogle = async (googleToken) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/google`, {
            token: googleToken,
        });
        const token = response.data.token;
        localStorage.setItem('auth_token', token);

        return { token };
    } catch (error) {
        let message = 'Error al iniciar sesión con Google.';
        if (error.response) {
            message = error.response.data.message || 'Fallo de autenticación con Google.';
        } else if (error.request) {
            message = 'No hubo respuesta del servidor.';
        } else {
            message = 'Error de red o de conexión.';
        }

        throw new Error(message);
    }
}



export const registerCustomer = async (customerData) => {
    try {
        const response = await axios.post(`${apiUrl}/customer-register`, customerData, {
            headers: { 'Content-Type': 'application/json' },
        });

        const result = response.data;

        if (result && result.message) {
            return { message: result.message };
        } else {
            throw new Error('No se pudo registrar. Intenta nuevamente.');
        }

    } catch (error) {
        let message = 'Error al registrar. Intenta nuevamente.';

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 400) {
                message = 'Datos incompletos o inválidos. Revisa los campos.';
            } else if (status === 409) {
                message = 'Ya existe una cuenta registrada con este correo.';
            } else if (status === 422) {
                message = 'El formato de los datos no es válido.';
            } else if (status === 500) {
                message = 'Error del servidor. Intenta más tarde.';
            } else {
                message = data.message || data.error || 'Error desconocido.';
            }
        } else if (error.request) {
            message = 'No se pudo conectar con el servidor. Revisa tu conexión.';
        }

        throw new Error(message);
    }
}

export const logout = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Token no encontrado');

    try {
        const response = await axios.post(`${apiUrl}/customer-logout`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('customerProfile');

        return { message: response.data.message || 'Sesión cerrada con éxito.' };
    } catch (error) {
        let message = 'Error al cerrar sesión.';

        if (error.response) {
            message = error.response.data.message || 'Error del servidor.';
        } else if (error.request) {
            message = 'No se pudo contactar con el servidor.';
        }

        throw new Error(message);
    }
}
