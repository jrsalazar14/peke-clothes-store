'use client'

import { useCart } from '@/app/contexts/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartItem } from '@/components/CartItem'
import { Button } from "@/components/ui/button"

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-background text-text flex flex-col">
            <Header />

            <main className="container mx-auto mt-8 px-4 flex-grow">
                <h1 className="text-3xl font-bold mb-6 text-primary">Tu Carrito</h1>

                {cart.map(item => (
                    <CartItem
                        key={`${item.product.id}-${item.size}`}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                ))}

                <div className="mt-6 text-right">
                    <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
                    <Button className="mt-4 bg-primary hover:bg-hover text-white">
                        Proceder al Pago
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}