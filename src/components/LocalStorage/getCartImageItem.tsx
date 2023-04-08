import { IImage } from "@/src/models/image.interface";
import { productService } from "@/src/services/product.service";
import { useEffect, useState } from "react";

type ImageListProps = {
    id: string | null;
};
const getCartImageItem = ({ id }: ImageListProps) => {
    const [images, setImage] = useState<IImage | null>(null);

    const initialValues: IImage = {
        id_image: "default",
        title: "DEFAULT",
        url: "https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png",
        main: true,
        product: undefined
    }

    useEffect(() => {
        async function loadProductImage(productId: string) {
            const image = await productService.getImages(productId);
            if (image && image.length > 0) {
                setImage(image[0]);
            }
            if (image?.length == 0 || image?.length == null){
                setImage(initialValues)
            }
        }
        if (id) {
            loadProductImage(id);
          }
    }, [id]);

    return (
        <div>
            {images && (
                <img
                src={images.url}
                alt={images.title}
                className="h-20 w-20 object-cover mt-4"/>
            )}
        </div>
    );
}
export default getCartImageItem;