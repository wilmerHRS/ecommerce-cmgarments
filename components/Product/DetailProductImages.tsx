import { IImage } from "@/interfaces/image.interface";
import React, { useEffect, useState } from "react";
import ImageList from "./ImageList";
import Breadcrumbs from "./Breadcrumbs";

type ImageListProps = {
    images: IImage[] | null;
};

const initialValues: IImage = {
    id_image: "default",
    title: "DEFAULT",
    url: "https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png",
    main: true,
    product: undefined,
};

const DetailProductImage = ({ images }: ImageListProps) => {
    const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

    const handleImageSelect = (image: IImage) => {
        setSelectedImage(image);
    };

    const breadcrumbsItems = [
        { label: "Inicio", href: "/" },
        { label: "Detalle de Producto" },
    ];

    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0]);
        }
        if (images?.length == 0 || images?.length == null) {
            setSelectedImage(initialValues);
        }
    }, [images]);

    return (
        <div className="bg-custom-color-beige">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-center items-center py-10">
                    <div className="w-full md:w-1/3 mx-2 flex justify-center items-center">
                        <ImageList
                            images={images}
                            onImageSelect={handleImageSelect}
                        />
                    </div>
                    <div className="w-full md:w-1/3 mx-2 flex flex-col justify-center items-center">
                        <Breadcrumbs items={breadcrumbsItems} />
                        {selectedImage && (
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="h-80 w-80 object-cover mt-4"
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/3 mx-2 justify-center items-center"></div>
                </div>
            </div>
        </div>
    );
};

export default DetailProductImage;
