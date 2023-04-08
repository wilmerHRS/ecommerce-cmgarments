import TitleShoppingCard from "@/components/ShoppingCard/TitleShoppingCards";
import deleteCartItem from "@/utils/deleteCartItem";
import GetCartImageItem from "@/components/LocalStorage/GetCartImageItem";
import getCartItems from "@/utils/getCartItem";
import { USER } from "@/constants/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const ShoppingCard = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [shouldUpdateTotal, setShouldUpdateTotal] = useState(false);

    const router = useRouter();

    const goProduct = (id: string, quantity: number) => {
        const currentPath = router.asPath;
        const newPath = `/detailProduct/${id}?cantidad=${quantity}`;

        if (currentPath !== newPath) {
            router.push(newPath);
        }
    };

    const handleDeleteCartItem = (id: string) => {
        deleteCartItem(id, cartItems, setCartItems, router);
        setShouldUpdateTotal(!shouldUpdateTotal);
    };

    useEffect(() => {
        const user = USER;
        const items = getCartItems(user);
        setCartItems(items);
        const totalPrice = items.reduce((acc: any, item: any) => {
            return acc + item.quantity * item.product.price;
        }, 0);
        setTotal(totalPrice);
    }, [shouldUpdateTotal]);

    return (
        <div key="shopping-card">
            <TitleShoppingCard />
            <div className="container max-w-screen-7xl mx-auto py-10">
                <div className="flex flex-row justify-center items-center">
                    <div className="w-full md:w-3/5 mx-2 flex justify-center items-center">
                        {cartItems.length === 0 ? (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">
                                    No hay productos actualmente en el carrito
                                </h2>
                            </div>
                        ) : (
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="w-1/4 px-4 py-2">
                                            Producto
                                        </th>
                                        <th className="w-1/4 px-4 py-2">
                                            Cantidad
                                        </th>
                                        <th className="w-1/4 px-4 py-2">
                                            Total
                                        </th>
                                        <th className="w-1/4 px-4 py-2">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {cartItems.map((item: any, index: any) => (
                                        <tr
                                            key={index}
                                            className="border-t border-b border-gray-300"
                                        >
                                            <td className="px-4 py-3 flex justify-center items-center">
                                                <GetCartImageItem
                                                    id={
                                                        item.product
                                                            .id_product + ""
                                                    }
                                                />
                                                <ul className="mt-4 px-4">
                                                    <li className="flex justify-center items-center">
                                                        {item.product.name}
                                                    </li>
                                                    <li className="flex justify-center items-center">
                                                        <span className="font-bold">
                                                            Talla
                                                        </span>
                                                        -{item.product.size}
                                                    </li>
                                                    <li className="font-bold">
                                                        ${item.product.price}
                                                    </li>
                                                </ul>
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2 font-bold">
                                                $
                                                {item.product.price *
                                                    item.quantity}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        goProduct(
                                                            item.product
                                                                .id_product +
                                                                "",
                                                            item.quantity
                                                        )
                                                    }
                                                    className="bg-white text-white px-1 py-1 mr-4"
                                                >
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
                                                        className="h-6 w-auto"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCartItem(
                                                            item.product
                                                                .id_product
                                                        )
                                                    }
                                                    className="bg-white text-white px-1 py-1"
                                                >
                                                    <img
                                                        src="https://icon-library.com/images/x-mark-icon/x-mark-icon-21.jpg"
                                                        className="h-6 w-auto"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="w-full md:w-1/5 mx-2 flex justify-center items-center">
                        <div className="bg-custom-color-beige shadow-md rounded-md p-6 w-full md:w-96">
                            <h2 className="text-2xl font-bold mb-4">
                                Total del Carrito
                            </h2>
                            <div className="flex justify-between items-center mb-2">
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <div className="border-t border-gray-300 my-4"></div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-xl font-bold">
                                    ${total}
                                </span>
                            </div>
                            <button className="bg-black text-white w-full py-3 rounded-md">
                                Proceder al pago
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShoppingCard;
