'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useCart } from '@/app/contexts/CartContext';

export function Header() {
    const cartContext = useCart();
    const itemCount = cartContext.cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-light-bg py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/" className="text-2xl font-bold">
                    <span className="text-secondary">Peke</span>
                    <span className="text-primary"> Clothes</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-primary border-primary">
                                Categorías <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="/products/babies" className="text-primary">Bebés</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/products/toddlers" className="text-primary">Niños Pequeños</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/products/kids" className="text-primary">Niños Grandes</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/cart">
                        <Button variant="ghost" className="text-primary">
                            Carrito ({itemCount})
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}