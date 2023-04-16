
const getCartSendItems = (user: any) => {
    const cartKey = `cart_${user}`;
    const storedCartsend = localStorage.getItem(cartKey+"send");
    const cartsend = storedCartsend ? JSON.parse(storedCartsend) : [];
    
    return cartsend;
};
export default getCartSendItems;
