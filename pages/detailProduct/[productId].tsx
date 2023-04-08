import DetailProductImage from "@/components/Product/DetailProductImages";
import ProductDetailsContent from "@/components/Product/ProductDetailsContent";
import { IImage } from "@/interfaces/image.interface";
import {
    IGetProduct,
} from "@/interfaces/product.interface";
import MainLayout from "@/layouts/MainLayout";
import { productService } from "@/services/product.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProduct = () => {
    const router = useRouter();
    const productid = router.query.productId as string;

    const [product, setProduct] = useState<IGetProduct | null>(null);
    const [image, setImage] = useState<IImage[] | null>(null);

    useEffect(() => {
        if (productid) {
            loadProduct(productid), loadProductImage(productid);
        }
    }, [productid]);

    async function loadProduct(productId: string) {
        const product = await productService.getProductid(productId);
        setProduct(product);
    }

    async function loadProductImage(productId: string) {
        const image = await productService.getImages(productId);
        setImage(image);
    }

    if (!product && productid) {
        loadProduct(productid as string);
    }

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <MainLayout title='Carrito'>
        <div className="font-poppins">
            <DetailProductImage images={image} />
            <ProductDetailsContent product={product} />
        </div>
        </MainLayout>
    );
};

export default DetailProduct;
