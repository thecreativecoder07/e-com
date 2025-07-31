export const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};


export const saveCartToLocalStorage = (cart: any) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

export const clearCartFromLocalStorage = () => {
  localStorage.removeItem("cart");
};
