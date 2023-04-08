const getCartItems = (user: any) => {
    const cartKey = `cart_${user}`;
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
};
export default getCartItems;
