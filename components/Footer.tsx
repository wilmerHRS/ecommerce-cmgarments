import type { FC } from 'react';

interface FooterProps { }

const Footer: FC<FooterProps> = ({ }) => {
  return (
    <footer className='flex w-100 justify-center bg-gray-900 h-[400px] items-center mt-10'>
      <div className='max-w-[1280px] w-full flex justify-between px-4'>
        <div className='flex flex-col gap-5 max-w-[350px]'>
          <h1 className='text-4xl text-cyan-500'>CMGarments</h1>
          <p className='text-gray-400 w-full'>The customer is at the heart of our unique business model, which includes design.</p>
          <span className='text-gray-400'>Aceptamos cualquier método de pago</span>
        </div>
        <div className='flex justify-around w-full'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-white text-2xl uppercase'>Shopping</h1>
            <ul className='text-gray-400 space-y-3'>
              <li>Clothin store</li>
              <li>Trending shoes</li>
              <li>Accessories</li>
              <li>Sale</li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='text-white text-2xl uppercase'>Shopping</h1>
            <ul className='text-gray-400 space-y-3'>
              <li>Contact us</li>
              <li>Payment Methods</li>
              <li>Delivary</li>
              <li>Return & Exchanges</li>
            </ul>
          </div>
        </div>
        <div className='max-w-[350px] space-y-5'>
          <h1 className='text-white text-2xl uppercase'>newletter</h1>
          <p className='text-gray-400'>Be the first to know about new arrivals, look books, sales & promos!</p>
          <input type="text" className='bg-gray-800 border-b-2 border-white w-full font-poppins text-md outline-none text-white p-2 font-light' />
        </div>
      </div>
    </footer>
  );
}
export default Footer;