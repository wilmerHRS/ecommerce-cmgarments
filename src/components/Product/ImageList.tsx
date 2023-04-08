import { IImage } from "../../models/image.interface";

type ImageListProps = {
    images: IImage[] | null;
    onImageSelect: (image: IImage) => void;
};

const ImageList = ({ images, onImageSelect }: ImageListProps) => {
    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-4">
            {images?.map((image) => (
                <img
                key={image.id_image}
                src={image.url}
                alt={image.title}
                onClick={() => onImageSelect(image)}    
                className="w-20 h-20 object-cover cursor-pointer"/>
            ))}
        </div>
    );
};
  
export default ImageList;
