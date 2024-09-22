"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Product, ProductSize } from "@/app/products/[category]/page";

type CartItem = {
	product: Product;
	quantity: number;
	size: ProductSize;
};

type CartContextType = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number, size: ProductSize) => void;
	updateQuantity: (id: number, size: ProductSize, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (newItem: CartItem) => {
		setCart(prevCart => {
			const existingItemIndex = prevCart.findIndex(
				item => item.product.id === newItem.product.id && item.size === newItem.size
			);

			if (existingItemIndex > -1) {
				// Item already exists, update quantity
				const updatedCart = [...prevCart];
				const existingItem = updatedCart[existingItemIndex];
				const availableQuantity = existingItem.product.size[existingItem.size] || 0;
				const newQuantity = Math.min(existingItem.quantity + newItem.quantity, availableQuantity);

				updatedCart[existingItemIndex] = {
					...existingItem,
					quantity: newQuantity
				};

				return updatedCart;
			} else {
				// New item, add to cart
				return [...prevCart, newItem];
			}
		});
	};

	const removeFromCart = (id: number, size: ProductSize) => {
		setCart(prevCart => prevCart.filter(item => !(item.product.id === id && item.size === size)));
	};

	const updateQuantity = (id: number, size: ProductSize, quantity: number) => {
		setCart(prevCart => prevCart.map(item => {
			if (item.product.id === id && item.size === size) {
				const availableQuantity = item.product.size[size] || 0;
				return { ...item, quantity: Math.min(quantity, availableQuantity) };
			}
			return item;
		}));
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}
