import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product, ProductSize } from '@/app/products/[category]/page'

interface CartItemProps {
    item: {
        product: Product;
        quantity: number;
        size: ProductSize;
    };
    onUpdateQuantity: (id: number, size: ProductSize, newQuantity: number) => void;
    onRemove: (id: number, size: ProductSize) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const { product, quantity, size } = item;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            onUpdateQuantity(product.id, size, newQuantity);
        }
    };

    return (
        <div className="flex items-center py-4 border-b border-gray-200">
            <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-md mr-4"
            />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                <p className="text-sm text-gray-600">Talla: {size}</p>
                <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
                <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 mr-2"
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemove(product.id, size)}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
}
