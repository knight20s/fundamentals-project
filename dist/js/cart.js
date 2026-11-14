import { getCart, saveCart } from "./cart-storage.js";
function createCartRow(item, index) {
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
    `;
    return tr;
}
function updateSummary() {
    const subtotal = document.querySelector("#cart-subtotal");
    const shipping = document.querySelector("#cart-shipping");
    const discount = document.querySelector("#cart-discount");
    const discountRow = document.querySelector("#cart-discount-row");
    const total = document.querySelector("#cart-total");
    if (!subtotal || !shipping || !discount || !discountRow || !total) {
        return;
    }
    const cart = getCart();
    let subTotalPrice = 0;
    cart.forEach((item) => subTotalPrice += item.price * item.quantity);
    subtotal.textContent = `$${String(subTotalPrice)}`;
    let discountPrice = 0;
    let shippingPrice = 0;
    if (subTotalPrice > 3000) {
        discountPrice = subTotalPrice * 0.1;
    }
    discountRow.hidden = discountPrice === 0;
    if (subTotalPrice > 0) {
        shippingPrice = 30;
    }
    shipping.textContent = `$${String(shippingPrice)}`;
    discount.textContent = `-$${String(discountPrice)}`;
    total.textContent = `$${String(subTotalPrice - discountPrice + shippingPrice)}`;
}
function renderCart() {
    const tbody = document.querySelector("tbody");
    if (!tbody) {
        return;
    }
    tbody.innerHTML = "";
    getCart().forEach((item, index) => tbody.append(createCartRow(item, index)));
    updateSummary();
}
function clearCart(message) {
    const cartMessage = document.querySelector("#cart-message");
    if (!cartMessage) {
        return;
    }
    saveCart([]);
    renderCart();
    cartMessage.textContent = message;
    cartMessage.hidden = false;
}
function initCartButtons() {
    const cartClear = document.querySelector("#cart-clear");
    const cartCheckout = document.querySelector("#cart-checkout");
    if (!cartClear || !cartCheckout) {
        return;
    }
    cartClear.addEventListener("click", () => clearCart("Your cart is empty. Use the catalog to add new items."));
    cartCheckout.addEventListener("click", () => clearCart("Thank you for your purchase."));
}
function initCartActions() {
    const tbody = document.querySelector("tbody");
    if (!tbody) {
        return;
    }
    tbody.addEventListener("click", (e) => {
        const button = e.target.closest("[data-action]");
        if (!button) {
            return;
        }
        const row = button.closest(".cart-table__row");
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
            }
            else {
                cart.splice(index, 1);
            }
        }
        if (button.dataset.action === "remove") {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
    });
}
renderCart();
initCartButtons();
initCartActions();
//# sourceMappingURL=cart.js.map