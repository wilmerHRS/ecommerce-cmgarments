import { IGetProduct, IProduct } from "@/interfaces/product.interface";
import { productService } from "@/services/product.service";

const handleAddToCart = async (
    user: string,
    product: string | null,
    quantity: number | null,
    router: any
) => {
    const cartKey = `cart_${user}`;
    // Obtener el carrito actual del localStorage si existe.
    const storedCart = localStorage.getItem(cartKey);
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // Verificar si el producto ya está en el carrito.
    const existingProductIndex = cart.findIndex(
        (item: any) =>
            item.product.id_product + "" === product + "" &&
            item.quantity !== null
    );

    const producto = await productService.getProductid(product + "");

    if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad.
        cart[existingProductIndex].quantity =
            quantity === null ? cart[existingProductIndex].quantity : quantity;
        cart[existingProductIndex].product = producto;
    } else {
        cart.push({
            product: producto,
            quantity: quantity === null ? 1 : quantity,
        });
    }

    // Guardar el carrito actualizado en el localStorage.
    localStorage.setItem(cartKey, JSON.stringify(cart));


    if (user ==='undefined') {
        const newPath = `/login`;
        router.push(newPath);
    } else {
        // Redireccionar a la página del carrito de compras.
        const currentPath = router.asPath;
        const newPath = `/shoppingcard`;

        if (currentPath !== newPath) {
            router.push(newPath);
        }
    }
};
export default handleAddToCart;
