import { IGetProduct, IGetSizes } from "@/interfaces/product.interface";
import { productService } from "@/services/product.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import handleAddToCart from "@/utils/addCartItem";
import useAuth from "@/hooks/useAuth";
type ObjProduct = {
    product: IGetProduct | null;
};

const ProductDetailsContent = ({ product }: ObjProduct) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [sizes, setSizes] = useState<IGetSizes | null>(null);
    const router = useRouter();
    const { cantidad } = router.query;
    const [scrollPosition, setScrollPosition] = useState<number | null>(null);
    const { customer } = useAuth();
    const USER = customer?.names + "";

    async function loadProductSize(productId: string) {
        const sizes = await productService.getSizes(productId);
        setSizes(sizes);
    }

    async function loadSizeSelected(productId: string, size: string) {
        const ProductSize = await productService.getProductidSize(
            productId,
            size
        );
        const currentPath = router.asPath;
        const newPath = `/detailProduct/${ProductSize.data.id_product + ""}`;

        if (currentPath !== newPath) {
            router.push(newPath);
        }
    }

    async function irLogin() {
        router.push("/login");
    }

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        if (size && product) {
            loadSizeSelected(product.data.id_product + "", size);
        }
    };
    const handleSizeClickInit = (size: string) => {
        setSelectedSize(size);
    };

    const size = sizes?.data.relation_size;

    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= parseFloat(product?.data.stock + "")) {
            setQuantity(value);
        }
    };

    const handleBlur = (e: any) => {
        const value = parseInt(e.target.value);
        if (value > 20) {
            handleQuantityChange(20);
        }
    };

    const addToCart = () => {
        const currentPath = router.asPath;
        const newPath = `/shoppingcard`;

        if (currentPath !== newPath) {
            router.push(newPath);
        }

        handleAddToCart(USER, product, quantity);
    };

    useEffect(() => {
        if (!selectedSize) {
            handleSizeClickInit(product?.data.size + "");
        }
        if (scrollPosition === null) {
            setScrollPosition(window.pageYOffset);
        }
        loadProductSize(product?.data.id_product + "");

        if (cantidad) {
            var initCantidad = parseInt(cantidad + "");
            setQuantity(initCantidad);
        }

        const handleRouteChange = () => {
            setQuantity(1);
        };

        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [selectedSize, router]);

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <div className="w-full lg:w-2/3">
                        <div className="py-10 text-center w-3/4 mx-auto">
                            <h4 className="text-2xl font-bold">
                                {product?.data.name}
                            </h4>
                            <h3 className="text-3xl mt-5">
                                $
                                {parseFloat(
                                    product?.data.price?.toString() + ""
                                )}
                            </h3>
                            <p className="my-4">{product?.data.description}</p>
                            {/* Añade tu componente de opciones de tamaño y color aquí */}
                            {/* Añade tu componente de opción de carrito aquí */}
                            <div className="flex mt-5 justify-center items-center">
                                <h4 className="px-4 py-2">Tallas: </h4>
                                {size?.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleSizeClick(size + "")
                                        }
                                        className={`px-4 py-2 mr-2 border border-black ${
                                            selectedSize === size
                                                ? "bg-black text-white"
                                                : "bg-white text-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center items-center mt-5">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gray-300 text-gray-600 px-2 py-1"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="w-12 text-center border border-gray-300 mx-2"
                                            value={quantity}
                                            min="1"
                                            max={product?.data.stock + ""}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            onBlur={handleBlur}
                                            readOnly
                                        />
                                        <button
                                            className="bg-gray-300 text-gray-600 px-2 py-1"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    {!customer ? (
                                        <button
                                            onClick={irLogin}
                                            className="bg-black text-white px-6 py-3 font-bold"
                                        >
                                            AÑADIR AL CARRITO
                                        </button>
                                    ) : (
                                        <button
                                            onClick={addToCart}
                                            className="bg-black text-white px-6 py-3 font-bold"
                                        >
                                            AÑADIR AL CARRITO
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center mt-16">
                                    <hr className="border border-gray-400 w-16 mx-2" />
                                    <h5 className="text-xl">
                                        <span>Pago seguro garantizado</span>
                                    </h5>
                                    <hr className="border border-gray-400 w-16 mx-2" />
                                </div>
                                <img
                                    src="https://themewagon.github.io/malefashion/img/shop-details/details-payment.png"
                                    alt=""
                                    className="mt-4"
                                />
                                <ul className="mt-10">
                                    <li>
                                        <span>SKU:</span> {product?.data.sku}
                                    </li>
                                    <li>
                                        <span>Categoría:</span>{" "}
                                        {product?.data.category?.name}
                                    </li>
                                    <li>
                                        <span>Marca:</span>{" "}
                                        {product?.data.brand?.name}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsContent;
