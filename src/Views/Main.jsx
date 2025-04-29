import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProductCategory from '../components/ProductCategory';
import NavbarProducts from '../components/NavbarProducts';
import Footer from '../components/Footer';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Coupons from './Coupons';
import YourCoupons from './YourCoupons';
import Modal from 'react-modal';

function Main() {
    Modal.setAppElement('#root');
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const shouldShowNav = !['/login', '/register', '/profile', '/coupons', '/yourCoupons'].includes(location.pathname);

    return (
        <div className="app">
            {shouldShowNav && (
                <>
                    <br /><br /><br />
                    <h4 className="menu-title">Nuestro Menú</h4>
                    <br /><br />
                    <NavbarProducts />
                    <br /><br />
                </>
            )}

            <Routes>
                <Route path="/" element={<ProductCategory tipo="platillos" titulo="Platillos" />} />
                <Route path="/bebidas" element={<ProductCategory tipo="bebidas" titulo="Bebidas" />} />
                <Route path="/otros" element={<ProductCategory tipo="otro" titulo="Otros" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/yourCoupons" element={<YourCoupons />} />
            </Routes>

            <Footer />

            {isVisible && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default Main;