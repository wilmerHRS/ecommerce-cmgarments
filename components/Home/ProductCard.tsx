import useAuth from '@/hooks/useAuth';
import { IProduct, IRecentProduct } from '@/interfaces/product.interface';
import handleAddToCart from '@/utils/addCartItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { BiCart } from 'react-icons/bi';

interface ProductCardProps {
  product: IRecentProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {

  const {push} = useRouter()

  const router = useRouter();
  const { customer } = useAuth();
    const USER = customer?.names + "";

  const addToCart = () => {
    handleAddToCart(USER, product.id_product+"", null, router);
};

  const handlePushCart = (id_product: string) => {
    push(`detailProduct/${id_product}`)
  }

  return (
    <div className='bg-gray-800 h-[380px] overflow-hidden rounded-md shadow-md '>
      <div className='w-[250px] h-[250px] relative bg-gray-300 cursor-pointer' onClick={() => handlePushCart(product.id_product)}>
        <Image src={product.images[0]?product.images[0].url:process.env.NEXT_PUBLIC_DEAFAULT_PRODUCT_IMAGE+""} fill alt={product.images[0]?product.images[0].title:"DEFAULTIMAGE.png"} className='object-cover' />
      </div>
      <div className='flex flex-col gap-2 p-3'>
        <h1 className='text-white text-xl truncate max-w-[220px]'>{product.name}</h1>
        <h1 className='text-white text-xl truncate max-w-[220px]'>Talla: {product.size}</h1>
        <div className='flex justify-end'>
          <BiCart size={35} className='text-white bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full cursor-pointer' onClick={addToCart} />
        </div>
      </div>
    </div>
  );
}
export default ProductCard;