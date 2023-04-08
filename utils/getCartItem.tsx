
const getCartItems = (user: any) => {
    const cartKey = `cart_${user}`;
    const storedCart = localStorage.getItem(cartKey);
    const cart = storedCart ? JSON.parse(storedCart) : [];
    
    return cart;
};
export default getCartItems;
