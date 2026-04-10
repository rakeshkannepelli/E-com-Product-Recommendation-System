import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../hooks/useCart';

type PaymentMethod = 'qr' | 'upi' | 'card';

const Payment: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    // Get the total passed from the Cart page
    const total = location.state?.total || 0;
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [activeMethod, setActiveMethod] = useState<PaymentMethod>('qr');

    // If someone tries to access /payment directly without total, redirect them to cart
    useEffect(() => {
        if (total === 0) {
            navigate('/cart');
        }
    }, [total, navigate]);

    const handleSimulatePayment = () => {
        setPaymentStatus('processing');
        // Simulate a 2-second payment processing delay
        setTimeout(() => {
            setPaymentStatus('success');
            // Empty the cart securely via backend call
            clearCart();
            // Wait another 2 seconds to show the success animation and toast before redirecting
            setTimeout(() => {
                navigate('/cart');
            }, 4000);
        }, 2000);
    };

    return (
        <div>
            <Header />
            <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ marginBottom: '10px', fontWeight: 800 }}>Checkout Payment</h1>
                    <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Select your preferred payment method to complete the purchase.</p>

                    <div className="payment-tabs">
                        <div className="tab-slider" style={{
                            position: 'absolute',
                            height: 'calc(100% - 12px)',
                            width: 'calc(33.33% - 8px)',
                            background: '#fff',
                            borderRadius: '12px',
                            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            left: activeMethod === 'qr' ? '6px' : activeMethod === 'upi' ? 'calc(33.33% + 4px)' : 'calc(66.66% + 2px)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            zIndex: 0
                        }}></div>
                        <button
                            className={`payment-tab-btn ${activeMethod === 'qr' ? 'active' : ''}`}
                            onClick={() => setActiveMethod('qr')}
                            style={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}
                        >
                            <i className="fas fa-qrcode"></i> Scan QR
                        </button>
                        <button
                            className={`payment-tab-btn ${activeMethod === 'upi' ? 'active' : ''}`}
                            onClick={() => setActiveMethod('upi')}
                            style={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}
                        >
                            <i className="fas fa-mobile-alt"></i> UPI ID
                        </button>
                        <button
                            className={`payment-tab-btn ${activeMethod === 'card' ? 'active' : ''}`}
                            onClick={() => setActiveMethod('card')}
                            style={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}
                        >
                            <i className="fas fa-credit-card"></i> Card
                        </button>
                    </div>

                    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', margin: '0', fontWeight: 700 }}>Total Bill: ₹{total.toFixed(2)}</h2>
                    </div>

                    <div className="payment-method-content">
                        {activeMethod === 'qr' && (
                            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                                <p style={{ marginBottom: '20px', fontSize: '14px', color: '#7f8c8d' }}>Scan this QR code with any payment app</p>
                                <img
                                    src="/QR_IMAGE/E-Commerce.png"
                                    alt="Payment QR Code"
                                    style={{ width: '220px', height: '220px', border: '8px solid #f1f2f6', borderRadius: '15px' }}
                                />
                            </div>
                        )}

                        {activeMethod === 'upi' && (
                            <div className="payment-form">
                                <div className="card-icons">
                                    <i className="fab fa-google-pay active"></i>
                                    <i className="fab fa-amazon-pay"></i>
                                    <i className="fas fa-wallet"></i>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Enter UPI ID</label>
                                    <input type="text" placeholder="username@upi" />
                                </div>
                                <p style={{ fontSize: '12px', color: '#95a5a6', marginTop: '10px' }}>Example: 9876543210@ybl, e-com@hdfc</p>
                            </div>
                        )}

                        {activeMethod === 'card' && (
                            <div className="payment-form">
                                <div className="card-icons">
                                    <i className="fab fa-cc-visa active"></i>
                                    <i className="fab fa-cc-mastercard"></i>
                                    <i className="fab fa-cc-amex"></i>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Expiry</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>CVV</label>
                                        <input type="password" placeholder="***" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <button
                            className="btn checkout-btn"
                            onClick={handleSimulatePayment}
                            disabled={paymentStatus !== 'idle'}
                            style={{
                                width: paymentStatus === 'success' ? '250px' : '100%',
                                padding: '16px',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                cursor: paymentStatus !== 'idle' ? 'not-allowed' : 'pointer',
                                backgroundColor: paymentStatus === 'success' ? '#2ecc71' : '',
                                color: paymentStatus === 'success' ? 'white' : '',
                                border: paymentStatus === 'success' ? 'none' : '',
                                borderRadius: '12px',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                margin: '0 auto',
                                display: 'block',
                                transform: paymentStatus === 'processing' ? 'scale(0.98)' : 'scale(1)'
                            }}>
                            {paymentStatus === 'idle' && (activeMethod === 'qr' ? "I have made the payment" : "Pay Now")}
                            {paymentStatus === 'processing' && (
                                <span><i className="fas fa-spinner fa-spin"></i> Processing...</span>
                            )}
                            {paymentStatus === 'success' && "✓ Order Successful"}
                        </button>
                    </div>

                    <div style={{
                        position: 'fixed',
                        top: paymentStatus === 'success' ? '40px' : '-100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(46, 204, 113, 0.3)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <i className="fas fa-check-circle"></i> Payment Verified! Your order has been placed.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

