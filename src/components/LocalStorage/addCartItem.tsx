import { IGetProduct } from "@/src/interfaces/product.interface";

const handleAddToCart = (
    user: string,
    product: IGetProduct | null,
    quantity: number
) => {
    const cartKey = `cart_${user}`;

    // Obtener el carrito actual del localStorage si existe.
    const storedCart = localStorage.getItem(cartKey);
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // Verificar si el producto ya está en el carrito.
    const existingProductIndex = cart.findIndex(
        (item: any) =>
            item.product.id_product + "" === product?.data.id_product + ""
    );

    if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad.
        cart[existingProductIndex].quantity = quantity;
    } else {
        // Si no, agregar el producto al carrito con la cantidad seleccionada.
        cart.push({
            product: product?.data,
            quantity: quantity,
        });
    }

    // Guardar el carrito actualizado en el localStorage.
    localStorage.setItem(cartKey, JSON.stringify(cart));

    // Redireccionar a la página del carrito de compras.
    // Reemplazar esto con la función de redirección en tu proyecto.
    console.log("Carrito actualizado:", cart);
};
export default handleAddToCart;
