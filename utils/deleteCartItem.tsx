import useAuth from "@/hooks/useAuth";

const deleteCartItem = (
    user: string,
    id: string,
    cartItems: any[],
    setCartItems: any,
    router: any
) => {
    // Crear un nuevo array sin el elemento a eliminar basándote en su ID.
    const updatedCartItems = cartItems.filter(
        (item: any) => item.product.id_product + "" !== id + ""
    );

    // Guardar el carrito actualizado en el localStorage.
    const cartKey = `cart_${user}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));

    // Actualizar el estado del carrito con los elementos actualizados.
    setCartItems(updatedCartItems);

    // Redireccionar a la página del carrito de compras.
    const newPath = `/shoppingcard`;
    router.push(newPath);
};
export default deleteCartItem;
