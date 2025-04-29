
import { useEffect, useState } from 'react';
import axios from 'axios';

function useFilteredProducts(tipo) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setProducts([]);
        setLoading(true);
        setError(null);

        const apiUrl = process.env.REACT_APP_API_URL_APP;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product`);
                const filtered = response.data
                    .filter(product => product.status === 1 && product.tipo.toLowerCase() === tipo.toLowerCase())
                    .map(product => ({
                        ...product,
                        imagen: product.imagen.replace(/^"(.*)"$/, '$1'), // quitar comillas dobles si existen
                        precio: Number(product.precio).toFixed(2),
                    }));

                setProducts(filtered);
            } catch (err) {
                setError(`Error al cargar los productos de tipo "${tipo}".`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tipo]);

    return { products, loading, error };
}

export default useFilteredProducts;