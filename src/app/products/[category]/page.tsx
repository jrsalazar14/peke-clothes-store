'use client'

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from '@/components/ProductCard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export type Category = keyof typeof productsByCategory;
export type ProductSize = 'S' | 'M' | 'L' | 'XL';
export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    size: { [key in ProductSize]?: number };
}

const productsByCategory = {
    babies: [
        { id: 1, name: "Mameluco Suave", price: 299, image: "/peke-clothes-logo.jpg", size: { S: 10, M: 5, L: 2, XL: 1 } },
        { id: 2, name: "Conjunto de Bodys", price: 399, image: "/peke-clothes-logo.jpg", size: { S: 8, M: 3, L: 1, XL: 0 } },
        { id: 3, name: "Pijama de Algodón", price: 249, image: "/peke-clothes-logo.jpg", size: { S: 15, M: 10, L: 5, XL: 0 } },
        { id: 4, name: "Vestido de Fiesta", price: 499, image: "/peke-clothes-logo.jpg", size: { S: 2, M: 5, L: 1, XL: 2 } },
        { id: 5, name: "Pantalón con Tirantes", price: 349, image: "/peke-clothes-logo.jpg", size: { S: 0, M: 1, L: 0, XL: 0 } },
        { id: 6, name: "Chamarra Ligera", price: 399, image: "/peke-clothes-logo.jpg", size: { S: 2, M: 0, L: 1, XL: 0 } },
    ],
    toddlers: [
        { id: 7, name: "Camiseta Estampada", price: 199, image: "/peke-clothes-logo.jpg", size: { S: 2, M: 1, L: 1, XL: 2 } },
        { id: 8, name: "Pantalón de Mezclilla", price: 299, image: "/peke-clothes-logo.jpg", size: { S: 2, M: 2, L: 2, XL: 2 } },
        { id: 9, name: "Vestido de Verano", price: 349, image: "/peke-clothes-logo.jpg", size: { S: 2, M: 2, L: 2, XL: 2 } },
    ],
    kids: [
        { id: 10, name: "Camiseta de Algodón", price: 149, image: "/peke-clothes-logo.jpg", size: { S: 1, M: 0, L: 0, XL: 0 } },
        { id: 11, name: "Pantalón de Tiro Alto", price: 249, image: "/peke-clothes-logo.jpg", size: { S: 0, M: 1, L: 0, XL: 0 } },
        { id: 12, name: "Vestido Elegante", price: 399, image: "/peke-clothes-logo.jpg", size: { S: 0, M: 0, L: 0, XL: 1 } },
        { id: 13, name: "Chamarra de Invierno", price: 449, image: "/peke-clothes-logo.jpg", size: { S: 1, M: 0, L: 0, XL: 0 } },
        { id: 14, name: "Camiseta de Manga Larga", price: 299, image: "/peke-clothes-logo.jpg", size: { S: 0, M: 1, L: 0, XL: 0 } },
        { id: 15, name: "Pantalón de Mezclilla", price: 349, image: "/peke-clothes-logo.jpg", size: { S: 0, M: 1, L: 0, XL: 0 } },
    ],
}
export { productsByCategory };

const categoryNames = {
    babies: "Bebés",
    toddlers: "Niños Pequeños",
    kids: "Niños Grandes",
}

// Update the component props type
export default function CategoryPage({ params }: { params: { category: Category } }) {
    const category = params.category as Category | undefined
    const [products, setProducts] = useState<typeof productsByCategory[Category]>([])
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        if (category && category in productsByCategory) {
            console.log("Category:", category)
            console.log("Products for category:", productsByCategory[category])
            setProducts(productsByCategory[category])
            setCategoryName(categoryNames[category] || category)
        } else {
            console.log("Invalid category:", category)
            setProducts([])
            setCategoryName('')
        }
    }, [category])

    console.log("Rendered products:", products)
    console.log("Rendered category name:", categoryName)

    if (!category || !(category in productsByCategory)) {
        return <div>Invalid category</div>
    }

    const sortProducts = (sortBy: string) => {
        let sortedProducts = [...products]
        switch (sortBy) {
            case 'price-low-high':
                sortedProducts.sort((a, b) => a.price - b.price)
                break
            case 'price-high-low':
                sortedProducts.sort((a, b) => b.price - a.price)
                break
            case 'name-a-z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'name-z-a':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
                break
        }
        setProducts(sortedProducts)
    }

    return (
        <div className="min-h-screen bg-background text-text">
            <Header />

            <main className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-6 text-primary">Ropa para {categoryName}</h1>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg">Mostrando {products.length} productos</p>
                    <Select onValueChange={sortProducts}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price-low-high">Precio: Bajo a Alto</SelectItem>
                            <SelectItem value="price-high-low">Precio: Alto a Bajo</SelectItem>
                            <SelectItem value="name-a-z">Nombre: A-Z</SelectItem>
                            <SelectItem value="name-z-a">Nombre: Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} category={category} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}