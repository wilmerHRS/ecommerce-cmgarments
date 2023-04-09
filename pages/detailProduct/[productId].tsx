import DetailProductImage from "@/components/Product/DetailProductImages";
import ProductDetailsContent from "@/components/Product/ProductDetailsContent";
import { IImage } from "@/interfaces/image.interface";
import { IGetProduct } from "@/interfaces/product.interface";
import MainLayout from "@/layouts/MainLayout";
import { productService } from "@/services/product.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProduct = () => {
    const router = useRouter();
    const productid = router.query.productId as string;

    const [product, setProduct] = useState<IGetProduct | null>(null);
    const [image, setImage] = useState<IImage[] | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            if (productid) {
                loadProduct(productid), loadProductImage(productid);
                setLoading(false);
            }
            setIsLoaded2(true)
        }
    }, [isLoaded, productid]);

    async function loadProduct(productId: string) {
        try {
            const product = await productService.getProductid(productId);
            setProduct(product);
        } catch (err) {}
    }

    async function loadProductImage(productId: string) {
        try {
            const image = await productService.getImages(productId);
            setImage(image);
        } catch (error) {}
    }

    if (!product && productid) {
        loadProduct(productid as string);
    }

    useEffect(() => {
        setIsLoaded(true); // Actualiza el estado cuando se carga la página
    }, []);

    return (
        <div>
            <MainLayout title="Detail">
                {loading ? (
                    <div></div>
                ) : (
                    <div>
                        {!product ? (
                            <div className="w-full h-80 flex justify-center items-center">
                                <div className="text-center">
                                    <h1 className="text-6xl font-bold mb-4">
                                        ERROR 404
                                    </h1>
                                    <h2 className="text-3xl">
                                        Producto no encontrado
                                    </h2>
                                </div>
                            </div>
                        ) : (
                            <div className="font-poppins">
                                <DetailProductImage images={image} />
                                <ProductDetailsContent product={product} />
                            </div>
                        )}
                    </div>
                )}
            </MainLayout>
        </div>
    );
};

export default DetailProduct;
