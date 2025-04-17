import { useEffect, useState } from "react";
import { fetchCoupons, redeemCoupon } from "../services/couponServices.js";

export const useCoupons = (navigate) => {

    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const loadCoupons = async () => {
            try {
                const couponsData = await fetchCoupons();
                setCoupons(couponsData);
            } catch (error) {
                if (error.message === 'No Autorizado') {
                    navigate('/login');
                } else {
                    console.error(error);
                    setToast({ message: error.message, type: 'error' });
                }
            } finally {
                setLoading(false);
            }
        }
        loadCoupons();

    }, [navigate]);

    const handleRedeem = async (couponId) => {
        try {
            await redeemCoupon(couponId);
            setToast({ message: 'Cupón canjeado con éxito. Revisa el apartado de "TUS CUPONES"', type: 'success' });
        } catch (error) {
            setToast({ message: `Error al canjear cupón : ${error.message}`, type: 'error' });
            setTimeout(() => setToast(null), 4000);
        }
    };

    return { coupons, loading, toast, handleRedeem };
}