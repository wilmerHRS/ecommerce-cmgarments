import { IGetProduct, IProduct } from "@/interfaces/product.interface";
import { productService } from "@/services/product.service";

const handleAddToCart = (
    user: string,
    product: string | null,
    quantity: number | null,
    router: any,
    state?: Boolean
) => {
    return new Promise(async (resolve) => {
        const cartKey = `cart_${user}`;
        // Obtener el carrito actual del localStorage si existe.
        const storedCart = localStorage.getItem(cartKey);
        const cart = storedCart ? JSON.parse(storedCart) : [];

        const storedCartsend = localStorage.getItem(cartKey + "send");
        const cartsend = storedCartsend ? JSON.parse(storedCartsend) : [];

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

            cartsend[existingProductIndex].quantity =
                quantity === null ? cartsend[existingProductIndex].quantity : quantity;

            cart[existingProductIndex].product = producto;

            cartsend[existingProductIndex].product_id = product;

            if (state) {
                cartsend[existingProductIndex].state = !cartsend[existingProductIndex].state;
                cart[existingProductIndex].state = !cart[existingProductIndex].state;
            }
        } else {
            cart.push({
                product: producto,
                quantity: quantity === null ? 1 : quantity,
                state: true
            });
            cartsend.push({
                product_id: producto.id_product + "",
                quantity: quantity === null ? 1 : quantity,
                state: true
            });
        }

        // Guardar el carrito actualizado en el localStorage.
        localStorage.setItem(cartKey, JSON.stringify(cart));
        localStorage.setItem(cartKey + "send", JSON.stringify(cartsend));

        if (user === "undefined") {
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

        // Llamar a resolve() para indicar que la función ha terminado
        resolve(null);
    });
};
export default handleAddToCart;
