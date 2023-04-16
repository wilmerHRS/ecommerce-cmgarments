import type { FC } from "react";
import { IShortCategory } from "@/interfaces/category.interface";
import { IPagination } from "@/interfaces/pagination.interface";
import MainLayout from "@/layouts/MainLayout";
import categoryService from "@/services/category.service";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import {
    IGetProduct,
    IProduct,
    IRecentProduct,
} from "@/interfaces/product.interface";
import { productService } from "@/services/product.service";
import ProductCard from "@/components/Home/ProductCard";
import Image from "next/image";
import imageService from "@/services/image.service";
import { IShortImage } from "@/interfaces/image.interface";
import { useRouter } from "next/router";
import handleAddToCart from "@/utils/addCartItem";
import useAuth from "@/hooks/useAuth";

const Carousel = dynamic(import("@/components/Home/Carousel"), { ssr: false });

interface Props {
    categories: IPagination<IShortCategory[]>;
    products: IRecentProduct[];
    weekProduct: IProduct;
    weekProductImage: IShortImage[];
}

const Home: FC<Props> = ({
    categories,
    products,
    weekProduct,
    weekProductImage,
}) => {
    const { push } = useRouter();

    const router = useRouter();
    const { customer } = useAuth();
    const USER = customer?.names + "";

    const addToCart = () => {
        handleAddToCart(USER, weekProduct.id_product + "", null, router);
    };

    const deletelocalstorage = () => {
        localStorage.clear();
    };


    return (
        <MainLayout title="Inicio">
            <div className="grid grid-flow-row gap-[70px] max-w-[1280px]">
                <div>
                    <Carousel />
                </div>
                <div className="flex flex-col gap-14 max-w-[1280px]">
                    <h1 className="text-4xl font-poppins font-light text-center">
                        Nuestras categorias mas populares
                    </h1>
                    <div className="flex justify-between">
                        {categories.data.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex bg-gray-700 hover:bg-gray-800 cursor-default p-3 rounded-md min-w-[200px] justify-center"
                                >
                                    <h1 className="text-white text-lg">
                                        {category.name}
                                    </h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-11">
                    <h1 className="text-4xl font-poppins font-light text-center">
                        Productos recientes
                    </h1>
                    <div className="w-[90%] mx-auto grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-items-center gap-10">
                        {products.map((product, index) => {
                            return (
                                <ProductCard key={index} product={product} />
                            );
                        })}
                    </div>
                </div>
                <div className="bg-gray-100 p-10 flex justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col gap-[80px]">
                            <h1 className="text-4xl font-poppins text-indigo-700 underline">
                                Porducto de la semana
                            </h1>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-2xl font-poppins text-blue-600">
                                    {weekProduct.name}
                                </h1>
                                <p className="text-blue-800 font-semibold text-lg">
                                    Color:{" "}
                                    <span className="text-gray-600 font-normal">
                                        {weekProduct.color}
                                    </span>
                                </p>
                                <p className="text-blue-800 font-semibold text-lg">
                                    Género:{" "}
                                    <span className="text-gray-600 font-normal">
                                        {weekProduct.gender}
                                    </span>
                                </p>
                                <p className="text-blue-800 font-semibold text-lg">
                                    Categoría:{" "}
                                    <span className="text-gray-600 font-normal">
                                        {weekProduct.category?.name}
                                    </span>
                                </p>
                                <p className="text-blue-800 font-semibold text-lg">
                                    Marca:{" "}
                                    <span className="text-gray-600 font-normal">
                                        {weekProduct.brand?.name}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-end">
                            <button
                                type="button"
                                className="bg-purple-600 bg-opacity-90 hover:bg-opacity-100 text-white p-4 rounded-md w-[250px]"
                                onClick={() =>
                                    push(
                                        `/detailProduct/${weekProduct.id_product}`
                                    )
                                }
                            >
                                Ver producto
                            </button>
                            <button
                                type="button"
                                className="bg-yellow-500 bg-opacity-90 hover:bg-opacity-100 text-white p-4 rounded-md w-[250px]"
                                onClick={addToCart}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-400 w-[400px] h-[400px] relative rounded-xl overflow-hidden">
                        <Image
                            src={
                                weekProductImage[0]
                                    ? weekProductImage[0].url
                                    : process.env
                                        .NEXT_PUBLIC_DEAFAULT_PRODUCT_IMAGE +
                                    ""
                            }
                            fill
                            alt="imagen_producto_semanal.png"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
    context: GetServerSidePropsContext
) => {
    const categories = await categoryService.getCategories(5, 1);
    const products = await productService.getRecentsProducts(9);
    const weekProduct = await productService.getProductid(
        process.env.WEEK_PRODUCT + ""
    );
    const weekProductImage = await imageService.getProductImage(
        process.env.WEEK_PRODUCT + ""
    );
    return {
        props: {
            categories,
            products,
            weekProduct,
            weekProductImage,
        },
    };
};
