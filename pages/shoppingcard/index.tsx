import TitleShoppingCard from '@/src/components/ShoppingCard/TitleShoppingCards';
import deleteCartItem from '@/src/components/LocalStorage/deleteCartItem';
import GetCartImageItem from '@/src/components/LocalStorage/getCartImageItem';
import getCartItems from '@/src/components/LocalStorage/getCartItem';
import { USER } from '@/src/components/user';
import { IImage } from '@/src/models/image.interface';
import { productService } from '@/src/services/product.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
            <div className="container max-w-screen-xl mx-auto py-10">
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="bg-white">
                            <th className="w-1/4 px-4 py-2">Producto</th>
                            <th className="w-1/4 px-4 py-2">Cantidad</th>
                            <th className="w-1/4 px-4 py-2">Total</th>
                            <th className="w-1/4 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {cartItems.map((item: any, index: any) => (
                            <tr key={index} className="border-t border-b border-gray-300">
                                <td className="px-4 py-3 flex justify-center items-center"><GetCartImageItem id={item.product.id_product + ""} />
                                        <ul className="mt-4 px-4">
                                            <li className="flex justify-center items-center">{item.product.name}</li>
                                            <li className="flex justify-center items-center"><span className='font-bold'>Talla</span>-{item.product.size}</li>
                                            <li className='font-bold'>${item.product.price}</li>
                                        </ul>
                                    </td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2 font-bold">${item.product.price * item.quantity}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => goProduct(item.product.id_product + "", item.quantity)}
                                        className="bg-white text-white px-1 py-1 mr-4"
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/65/65000.png" className="h-6 w-auto" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCartItem(item.product.id_product)}
                                        className="bg-white text-white px-1 py-1"
                                    >
                                        <img src="https://icon-library.com/images/x-mark-icon/x-mark-icon-21.jpg" className="h-6 w-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 py-6 flex justify-between items-center w-full">
                <h4 className="font-bold">SubTotal: ${total}</h4>
                <div>
                    <Link href={"/"} passHref>
                        <button
                        onClick={() => {/*ir Inicio*/}}
                        className="bg-black text-white px-6 py-2 mr-4"
                        >
                        Inicio
                        </button>
                    </Link>
                    <button
                    onClick={() => {/* agregar la función para comprar*/}}
                    className="bg-black text-white px-6 py-2"
                    >
                    Continuar Compra
                    </button>
                </div>
                </div>

            </div>
            
        </div>
    );
    
}
export default ShoppingCard;