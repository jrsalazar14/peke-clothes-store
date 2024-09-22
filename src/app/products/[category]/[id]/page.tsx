'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from '@/components/Footer'
import { productsByCategory, Category, Product, ProductSize } from '../page'
import { Header } from '@/components/Header'
import { useCart } from '@/app/contexts/CartContext'
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }: { params: { category: Category; id: string } }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [selectedSize, setSelectedSize] = useState<ProductSize | ''>('')
    const [quantity, setQuantity] = useState(1)
    const { cart, addToCart } = useCart()
    // TODO: Fix toast
    const { toast } = useToast()

    useEffect(() => {
        const { category, id } = params
        const productId = parseInt(id)
        const foundProduct = productsByCategory[category]?.find(p => p.id === productId)
        setProduct(foundProduct || null)
    }, [params])

    if (!product) {
        return <div>Product not found</div>
    }

    const availableSizes = Object.entries(product.size)
        .filter(([_, inventory]) => inventory > 0)
        .map(([size]) => size as ProductSize)

    const getAvailableQuantity = (size: ProductSize) => {
        const maxQuantity = product.size[size] || 0;
        const cartItem = cart.find(item => item.product.id === product.id && item.size === size);
        return maxQuantity - (cartItem?.quantity || 0);
    };

    const maxQuantity = selectedSize ? getAvailableQuantity(selectedSize) : 0;

    const handleAddToCart = () => {
        if (product && selectedSize && quantity > 0) {
            const availableQuantity = getAvailableQuantity(selectedSize);
            if (quantity <= availableQuantity) {
                addToCart({
                    product,
                    quantity,
                    size: selectedSize
                });
                toast({
                    title: "Product added to cart",
                    description: `${quantity} ${product.name} (${selectedSize}) added to your cart.`,
                });
            } else {
                toast({
                    title: "Unable to add to cart",
                    description: `Only ${availableQuantity} items available for this size.`,
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Unable to add to cart",
                description: "Please select a size and quantity.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen bg-background text-text">
            <Header />

            <main className="container mx-auto mt-8 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-3xl font-bold text-primary mb-4">{product.name}</h1>
                        <p className="text-2xl font-semibold text-secondary mb-6">${product.price.toFixed(2)}</p>
                        <p className="text-text mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <div className="mb-4">
                            <label htmlFor="size-select" className="block text-sm font-medium text-text mb-2">Talla</label>
                            <Select onValueChange={(value) => setSelectedSize(value as ProductSize)}>
                                <SelectTrigger id="size-select" className="w-full">
                                    <SelectValue placeholder="Selecciona una talla" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="quantity-select" className="block text-sm font-medium text-text mb-2">Cantidad</label>
                            <Select
                                onValueChange={(value) => setQuantity(parseInt(value))}
                                disabled={!selectedSize}
                            >
                                <SelectTrigger id="quantity-select" className="w-full">
                                    <SelectValue placeholder="Selecciona una cantidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...Array(maxQuantity)].map((_, i) => (
                                        <SelectItem key={i} value={(i + 1).toString()}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            className="bg-primary hover:bg-hover text-white w-full"
                            disabled={!selectedSize || quantity === 0}
                            onClick={handleAddToCart}
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}