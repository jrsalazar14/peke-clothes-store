import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product, Category } from '@/app/products/[category]/page'

interface ProductCardProps {
    product: Product;
    category: Category;
}

export function ProductCard({ product, category }: ProductCardProps) {
    const availableSizes = Object.entries(product.size)
        .filter(([_, count]) => count > 0)
        .map(([size]) => size)
        .join(', ')

    return (
        <Card className="bg-white border-primary shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-md mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold mb-2 text-primary">{product.name}</h2>
                <p className="text-lg mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm mb-2">Tallas disponibles: {availableSizes}</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-hover text-white">
                    <Link href={`/products/${category}/${product.id}`}>Ver Detalles</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}