import TitleShoppingCard from "@/components/ShoppingCard/TitleShoppingCards";
import {
    PayPalScriptProvider,
    PayPalButtons,
    FUNDING,
} from "@paypal/react-paypal-js";
import deleteCartItem from "@/utils/deleteCartItem";
import GetCartImageItem from "@/components/LocalStorage/GetCartImageItem";
import getCartItems from "@/utils/getCartItem";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import useAuth from "@/hooks/useAuth";
import handleAddToCart from "@/utils/addCartItem";
import getCartSendItems from "@/utils/getCartSendItem";
import { ICartItem, ISaleC } from "@/interfaces/sale.interface";
import { SaleService } from "@/services/sale.service";
import imagen from "../../images/pagar.png";
import deleteAllCartItem from "@/utils/deleteAllCart";
import Swal from "sweetalert2";
import axios from "axios";
import { ButtonPaypal } from "./ButtonPaypal";
const ShoppingCard = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [cartItemsSend, setCartItemsSend] = useState<ICartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [shouldUpdateTotal, setShouldUpdateTotal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isPay, setIsPay] = useState(false);

    const { customer } = useAuth();
    const USER = customer?.names + "";

    const router = useRouter();

    const goProduct = (id: string, quantity: number) => {
        const currentPath = router.asPath;
        const newPath = `/detailProduct/${id}?cantidad=${quantity}`;

        if (currentPath !== newPath) {
            router.push(newPath);
        }
    };

    const reload = () => {
        const user = USER;
        const updatedCartItems = getCartItems(user);
        const updatedCartItemsSend = getCartSendItems(user);
        setCartItems(updatedCartItems);
        setCartItemsSend(updatedCartItemsSend);
        const total = calculateTotal(updatedCartItems).toFixed(2);
        setTotal(total);
    };

    // majeado de pago
    const handlePay = (e: any) => {
        //console.log("se ejecuta");
        setIsPay(true);
    };

    const handleCancelPay = () => {
        setIsPay(false);
    };

    const handlecreateOrder = async () => {
        try {
            reload();
            console.log(total);
            const res = await axios({
                url: "http://localhost:3001/api/payment",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    total: total,
                },
            });
            return res.data.id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnCancel = () => {
        Swal.fire({
            title: "Compra Cancelada",
            text: `Se ha cancelado la compra.`,
            icon: "error",
        });
        setIsPay(false);
    };

    const handleOnAprove = async function (data: any, actions: any) {
        try {
            reload();
            await actions.order?.capture();
            handleSale();
        } catch (error) {
            console.log(error);
        }
        setIsPay(false);
    };

    const handleStateCartItem = async (id: string, state: Boolean) => {
        await handleAddToCart(USER, id, null, router, state);
        setShouldUpdateTotal(!shouldUpdateTotal);
        reload();
    };

    const handleSale = async () => {
        // Crear el objeto de venta
        const sale: ISaleC = {
            id_customer: customer?.id_customer + "", // Asegúrate de que 'customer' esté definido y tenga el id_customer
            sale_details: cartItemsSend.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                state: item.state,
            })),
        };

        try {
            reload();
            const newSale = await SaleService.create(sale);
            const user = USER;
            deleteAllCartItem(
                user,
                cartItems,
                setCartItems,
                router,
                cartItemsSend,
                setCartItemsSend
            );
            reload();
            Swal.fire({
                title: `Compra Realizada Correctamente`,
                text: `gracias por la compra ${newSale.customer?.names}`,
                icon: "success",
            });
        } catch (error) {
            // Manejar el error aquí
            console.error("Error al crear la venta:", error);
        }
    };

    const handleDeleteCartItem = (id: string) => {
        deleteCartItem(
            USER,
            id,
            cartItems,
            setCartItems,
            router,
            cartItemsSend,
            setCartItemsSend
        );
        setShouldUpdateTotal(!shouldUpdateTotal);

        reload();
    };

    const calculateTotal = (cartItems: any) => {
        return cartItems.reduce((acc: any, item: any) => {
            return acc + (item.state ? item.quantity * item.product.price : 0);
        }, 0);
    };

    const areAllItemsDisabled = () => {
        return cartItems.every((item) => !item.state);
    };

    useEffect(() => {
        if (isLoaded) {
            reload();
            setLoading(false);
            if (!customer) {
                router.push("/login");
            }
        }
    }, [customer, isLoaded, USER]);

    useEffect(() => {
        setIsLoaded(true); // Actualiza el estado cuando se carga la página
    }, []);

    useEffect(() => {}, [
        cartItemsSend,
        setCartItemsSend,
        cartItems,
        setCartItems,
        total,
        setTotal,
        setIsPay,
        isPay,
    ]);

    return (
        <div>
            {loading ? (
                <div className="w-full h-80 flex justify-center items-center"></div>
            ) : (
                <MainLayout title="Carrito">
                    {!customer ? (
                        <div className="w-full h-80 flex justify-center items-center">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold mb-4">
                                    ERROR 404
                                </h1>
                                <h2 className="text-3xl">
                                    Página no encontrada
                                </h2>
                            </div>
                        </div>
                    ) : (
                        <div key="shopping-card" className="font-poppins">
                            <TitleShoppingCard />
                            <div className="container max-w-screen-7xl mx-auto py-10">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="w-full md:w-3/4 mx-2 flex justify-center items-center">
                                        {cartItems.length === 0 ? (
                                            <div className="text-center">
                                                <h2 className="text-2xl font-bold mb-4">
                                                    No hay productos actualmente
                                                    en el carrito
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
                                                    {cartItems.map(
                                                        (
                                                            item: any,
                                                            index: any
                                                        ) => (
                                                            <tr
                                                                key={index}
                                                                className={`border-t border-b border-gray-300`}
                                                            >
                                                                <td
                                                                    className={`px-4 py-3 flex justify-center items-center ${
                                                                        item.state
                                                                            ? ""
                                                                            : "opacity-30"
                                                                    }`}
                                                                >
                                                                    <GetCartImageItem
                                                                        id={
                                                                            item
                                                                                .product
                                                                                .id_product +
                                                                            ""
                                                                        }
                                                                    />
                                                                    <ul className="mt-4 px-4">
                                                                        <li className="flex justify-center items-center">
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </li>
                                                                        <li className="flex justify-center items-center">
                                                                            <span className="font-bold">
                                                                                Talla
                                                                            </span>
                                                                            -
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .size
                                                                            }
                                                                        </li>
                                                                        <li className="font-bold">
                                                                            $
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .price
                                                                            }
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                                <td
                                                                    className={`px-4 py-2 ${
                                                                        item.state
                                                                            ? ""
                                                                            : "opacity-30"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </td>
                                                                <td
                                                                    className={`px-4 py-2 font-bold ${
                                                                        item.state
                                                                            ? ""
                                                                            : "opacity-30"
                                                                    }`}
                                                                >
                                                                    $
                                                                    {(item
                                                                        .product
                                                                        .price *
                                                                        item.quantity).toFixed(2)}
                                                                </td>
                                                                <td
                                                                    className={
                                                                        "px-4 py-2"
                                                                    }
                                                                >
                                                                    <button
                                                                        onClick={() =>
                                                                            goProduct(
                                                                                item
                                                                                    .product
                                                                                    .id_product +
                                                                                    "",
                                                                                item.quantity
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isPay
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
                                                                                item
                                                                                    .product
                                                                                    .id_product
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isPay
                                                                        }
                                                                        className="bg-white text-white px-1 py-1 mr-4"
                                                                    >
                                                                        <img
                                                                            src="https://icon-library.com/images/x-mark-icon/x-mark-icon-21.jpg"
                                                                            className="h-6 w-auto"
                                                                        />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleStateCartItem(
                                                                                item
                                                                                    .product
                                                                                    .id_product,
                                                                                true
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isPay
                                                                        }
                                                                        className="bg-white text-white px-1 py-1"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                item.state
                                                                                    ? "https://cdn-icons-png.flaticon.com/512/32/32320.png"
                                                                                    : "https://cdn-icons-png.flaticon.com/512/32/32339.png"
                                                                            }
                                                                            className="h-6 w-auto"
                                                                        />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
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
                                                <span className="text-xl font-bold">
                                                    Total
                                                </span>
                                                <span className="text-xl font-bold">
                                                    ${total}
                                                </span>
                                            </div>
                                            <button
                                                className={`${
                                                    cartItems.length === 0 ||
                                                    areAllItemsDisabled()
                                                        ? "bg-black opacity-30"
                                                        : "bg-black"
                                                } ${
                                                    isPay ? "hidden" : ""
                                                } text-white w-full py-3 rounded-md flex items-center justify-center`}
                                                onClick={handlePay}
                                                disabled={
                                                    cartItems.length === 0 ||
                                                    areAllItemsDisabled()
                                                }
                                            >
                                                <img
                                                    src={
                                                        "https://cdn-icons-png.flaticon.com/512/1571/1571065.png"
                                                    }
                                                    className="w-1/4 h-auto opacity-100 cv"
                                                />
                                            </button>

                                            {isPay ? (
                                                <div>
                                                    <ButtonPaypal
                                                        handlecreateOrder={
                                                            handlecreateOrder
                                                        }
                                                        areAllItemsDisabled={
                                                            areAllItemsDisabled
                                                        }
                                                        cartItems={cartItems}
                                                        handleOnAprove={
                                                            handleOnAprove
                                                        }
                                                        handleOnCancel={
                                                            handleOnCancel
                                                        }
                                                    />
                                                    <button
                                                        className={`bg-red-500 text-white w-full py-3 rounded-md flex items-center justify-center`}
                                                        onClick={
                                                            handleCancelPay
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                "   https://cdn-icons-png.flaticon.com/512/545/545676.png "
                                                            }
                                                            className="w-auto h-6"
                                                        />
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </MainLayout>
            )}
        </div>
    );
};
export default ShoppingCard;
