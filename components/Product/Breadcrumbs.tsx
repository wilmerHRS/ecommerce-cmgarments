import Link from "next/link";

type BreadcrumbsProps = {
    items: { label: string; href?: string }[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <div className="text-sm">
            {items.map((item, index) => (
                <span key={item.label}>
                    {item.href ? (
                        <Link href={item.href} passHref>
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                                {item.label}
                            </span>
                        </Link>
                    ) : (
                        <span className="text-gray-400">{item.label}</span>
                    )}
                    {index < items.length - 1 && (
                        <span className="mx-2 ">&gt;</span>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
