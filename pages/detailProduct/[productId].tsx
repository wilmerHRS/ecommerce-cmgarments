import ImageList from '@/src/components/Product/ImageList';
import DetailProductImage from '@/src/components/Product/DetailProductImages';
import ProductDetailsContent from '@/src/components/Product/ProductDetailsContent';
import { IImage } from '@/src/models/image.interface';
import { IGetProduct, IGetSizes, IProduct, IProductSizes } from '@/src/models/product.interface';
import { productService } from '@/src/services/product.service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailProduct = () => {
  const router = useRouter();
  const productid = router.query.productId as string;

  const [product, setProduct] = useState<IGetProduct | null>(null);
  const [image, setImage] = useState<IImage[] | null>(null);

  useEffect(() => {
    if (productid) {
      loadProduct(productid),
      loadProductImage(productid);
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
    <div>
        <DetailProductImage images={image}/>
        <ProductDetailsContent product={product}/>
    </div>
  );
};

export default DetailProduct;
