import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getCartByUser } from '../../redux/thunk/cartThunk';
import { removeItem, updateQuantity } from '../../redux/slices/cartSlices';
import { loadCartFromLocalStorage } from '@/utils/localstorage';
import { useCartSync } from '../../hooks/useCartSync';


const CartOffcanvas = () => {
    useCartSync();

    const [openCanvas, setOpenCanvas] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);


    const dispatch = useDispatch<AppDispatch>();
    const userCart = useSelector((state: RootState) => state.cart.userCart);

    useEffect(() => {
        const localCart = loadCartFromLocalStorage();
        if (!localCart || localCart.length === 0) {
            dispatch(getCartByUser(1));
        }
    }, [dispatch]);


    const cartItems = userCart?.flatMap(cart => cart.products) || [];
    console.log(cartItems)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    const applyCoupon = () => {
        const code = couponCode.toUpperCase();
        if (code === "DISCOUNT10") setDiscount(10);
        else if (code === "DISCOUNT20") setDiscount(20);
        else alert("Invalid coupon code");
    };

    const updateQty = (id: number, qty: number) => {
        if (qty < 1) return;
        dispatch(updateQuantity({ productId: id, quantity: qty }));
    };

    const remove = (id: number) => {
        dispatch(removeItem(id));
    };

    return (
        <>
            <button className="cart-button position-relative" onClick={() => setOpenCanvas(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9457f6" className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {isMounted && cartItems.length > 0 && (
  <span className="cart-badge">
    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
  </span>
)}

            </button>

            {openCanvas && (
                <div className="offcanvas-overlay" onClick={() => setOpenCanvas(false)}>
                    <div className="offcanvas-container" onClick={(e) => e.stopPropagation()}>
                        <div className="offcanvas-header d-flex justify-content-between">
                            <h3 className="offcanvas-title">
                                Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                            </h3>
                            <button className="btn" onClick={() => setOpenCanvas(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>

                        <div className="offcanvas-body">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-secondary w-full" onClick={() => setOpenCanvas(false)}>
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cartItems.map(item => (
                                            <div className="cart-item" key={item.id}>
                                                <div className="item-details">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="">
                                                            <h5>{item.title}</h5>
                                                            <p>${item.price.toFixed(2)}</p>
                                                            <div className="quantity-controls">
                                                                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                                                                <span className="quantity">{item.quantity}</span>
                                                                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                                                            </div>
                                                        </div>
                                                        <img src={item?.thumbnail} alt="" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                                    </div>
                                                </div>
                                                <div className="item-actions">
                                                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                    <button className="remove-item btn" onClick={() => remove(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="coupon-section">
                                        <h5>Apply Coupon</h5>
                                        <div className="coupon-input">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            <button className="apply-coupon" onClick={applyCoupon}>
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-summary">
                                        <div className="summary-row">
                                            <span>Subtotal:</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="summary-row discount-row">
                                                <span>Discount ({discount}%):</span>
                                                <span>-${discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="summary-row total-row">
                                            <span>Total:</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <button className="btn w-100 btn-primary">Proceed to Checkout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartOffcanvas;
