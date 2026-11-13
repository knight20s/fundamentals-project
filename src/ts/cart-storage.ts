import type {CartItem} from "./type.js";

const CART_KEY = "cart";

export function getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export function saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    updateCartCounter();
}

export function updateCartCounter(): void {
    const counter = document.querySelector<HTMLElement>(".header__cart-count");

    if (!counter) {
        return
    }

    let total = 0;

    getCart().forEach((item) => total += item.quantity);

    counter.textContent = String(total);


    counter.hidden = total === 0;
}

export function addToCart(newItem: CartItem): void {
    const cart = getCart();

    const existingItem = cart.find((item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size);
    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    }
    else{
        cart.push(newItem);
    }

    saveCart(cart);
}