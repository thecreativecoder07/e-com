import React from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CartProduct } from '../../redux/thunk/cartThunk';
import { updateQuantity } from '../../redux/slices/cartSlices';

interface Props {
  id: number;
}

const AddToCartBtn: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userCart = useSelector((state: RootState) => state.cart?.userCart || []);

  const cartProduct: CartProduct | undefined = userCart
    .flatMap(cart => cart.products)
    .find(product => product.id === id);

  const quantity = cartProduct?.quantity || 0;

  const handleCartItems = (id: number) => {
    dispatch(addToCart({
      userId: 1,
      products: [{ id, quantity: 1 }],
    }));
  };

const handleQuantityChange = (delta: number) => {
  const newQty = Math.max(0, quantity + delta);
  dispatch(updateQuantity({ productId: id, quantity: newQty }));
};

  return (
    <>
      {quantity === 0 ? (
        <button className="btn btn-sm btn-primary" onClick={() => handleCartItems(id)}>
          Add to Cart
        </button>
      ) : (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
