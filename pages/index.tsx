import type { FC } from 'react';
import { IShortCategory } from "@/interfaces/category.interface";
import { IPagination } from "@/interfaces/pagination.interface";
import MainLayout from "@/layouts/MainLayout";
import categoryService from "@/services/category.service";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { IGetProduct, IProduct, IRecentProduct } from '@/interfaces/product.interface';
import { productService } from '@/services/product.service';
import ProductCard from '@/components/Home/ProductCard';

const Carousel = dynamic(import('@/components/Home/Carousel'), { ssr: false })

interface Props {
  categories: IPagination<IShortCategory[]>
  products: IRecentProduct[]
  weekProduct: IProduct
}

const Home: FC<Props> = ({ categories, products, weekProduct}) => {
  return (
    <MainLayout title="Inicio">
      <div className='grid grid-flow-row gap-[70px]'>
        <div>
          <Carousel />
        </div>
        <div className='flex flex-col gap-14'>
          <h1 className='text-4xl font-poppins font-light text-center'>Nuestras categorias mas populares</h1>
          <div className='flex gap-5'>
            {
              categories.data.map((category, index) => {
                return (
                  <div key={index} className='flex bg-gray-700 hover:bg-gray-800 cursor-default p-3 rounded-md min-w-[250px] justify-center'>
                    <h1 className='text-white text-lg'>{category.name}</h1>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='flex flex-col gap-11'>
          <h1 className='text-4xl font-poppins font-light text-center'>Productos recientes</h1>
          <div className='w-[90%] mx-auto grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-items-center gap-10'>
            {
              products.map((product, index) => {
                return (
                  <ProductCard key={index} product={product}/>
                )
              })
            }
          </div>
        </div>
        <div className='bg-gray-200 h-[400px] p-10'>
          <div>
            <h1 className='text-4xl font-poppins text-slate-700'>Porducto de la semana</h1>
            <div>
              <h1>{weekProduct.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
  const categories = await categoryService.getCategories(5, 1)
  const products = await productService.getRecentsProducts(9)
  const weekProduct = await productService.getProductid(process.env.WEEK_PRODUCT+"")
  return {
    props: {
      categories,
      products,
      weekProduct
        }
  }
}




