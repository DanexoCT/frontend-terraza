import { useEffect, useState } from "react";
import { getRedeemedCoupons } from "../services/couponServices.js";

export const useYourCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("customerProfile");
        const token = localStorage.getItem("auth_token");

        if (!storedUser || !token) {
            setError("No se encontró la información de autenticación.");
            setLoading(false);
            return;
        }
        let clienteId = null;
        try {
            const parsedUser = JSON.parse(storedUser);
            clienteId = parsedUser.userIdentifier;
        } catch (err) {
            setError("Error al procesar los datos del usuario.");
            setLoading(false);
            return;
        }


        const fetchCoupons = async () => {
            try {
                const cupones = await getRedeemedCoupons(clienteId, token);
                setCoupons(cupones);
            } catch (err) {
                setError("No se pudieron cargar los cupones canjeados. Intenta nuevamente más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    return { coupons, loading, error };
}