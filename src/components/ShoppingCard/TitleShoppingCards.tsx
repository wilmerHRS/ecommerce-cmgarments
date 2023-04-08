import Breadcrumbs from "../Product/Breadcrumbs";

const breadcrumbsItems = [
    { label: "Inicio", href: "/" },
    { label: "Carrito de Compra" },
];

const TitleShoppingCard = () => {
    return (
        <div className="bg-custom-color-beige">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row py-10">
                    <div className="w-full md:w-1/3 mx-12 flex justify-center items-center">
                        <ul>
                            <li className="text-2xl">
                                <span>Carrito de Compra</span>
                            </li>
                            <li className="mt-1.5">
                                {<Breadcrumbs items={breadcrumbsItems} />}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TitleShoppingCard;
