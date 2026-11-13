import {getCart, saveCart} from "./cart-storage.js";
import type {CartItem} from "./type.js";

function createCartRow(item: CartItem, index: number): HTMLTableRowElement {
    const tr = document.createElement("tr");
    tr.classList.add("cart-table__row");
    tr.dataset.index = String(index);

    tr.innerHTML = `
        <td class="cart-table__cell cart-table__image">
                        <img class="cart-table__img" src="${item.imageUrl}" alt="">
                    </td>
                    <td class="cart-table__cell cart-table__name">${item.name} (${item.size}, ${item.color})</td>
                    <td class="cart-table__cell cart-table__price">$${item.price}</td>
                    <td class="cart-table__cell cart-table__quantity">
                        <div class="cart-table__counter">
                            <button class="cart-table__counter-btn" type="button" aria-label="Decrease quantity" data-action="decrease">-</button>
                            <span class="cart-table__value">${item.quantity}</span>
                            <button class="cart-table__counter-btn" type="button" aria-label="Increase quantity" data-action="increase">+</button>
                        </div>
                    </td>
                    <td class="cart-table__cell cart-table__total">$${item.price * item.quantity}</td>
                    <td class="cart-table__cell">
                        <button class="cart-table__delete" type="button" aria-label="Remove ${item.name}" data-action="remove">
                            <img class="cart-table__bin" src="../img/icons/bin.svg" alt="">
                        </button>
                    </td>
    `

    return tr;
}

function renderCart(): void {
    const tbody = document.querySelector("tbody");

    if (!tbody) {
        return;
    }

    tbody.innerHTML = "";

    getCart().forEach((item: CartItem, index: number) => tbody.append(createCartRow(item, index)));
}

function initCartActions(): void {
    const tbody = document.querySelector("tbody");

    if (!tbody) {
        return;
    }

    tbody.addEventListener("click", (e) => {
        const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action]")

        if (!button) {
            return;
        }

        const row = button.closest<HTMLTableRowElement>(".cart-table__row");

        if (!row) {
            return;
        }

        const index = Number(row.dataset.index);
        const cart = getCart();
        const item = cart[index];

        if (!item) {
            return;
        }

        if (button.dataset.action === "increase") {
            item.quantity += 1;
        }
        if (button.dataset.action === "decrease") {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }
        if (button.dataset.action === "remove") {
            cart.splice(index, 1);
        }

        saveCart(cart);
        renderCart();
    })
}

renderCart();
initCartActions()