import { getProducts } from "./api.js";
import { renderStars, createProductCard, getRandomProducts, initAddToCart } from "./card.js";
import { addToCart } from "./cart-storage.js";
import { initFormMessage } from "./form.js";
function initReview() {
    const form = document.querySelector(".review-form");
    const message = document.querySelector(".review-form__message");
    if (!form || !message) {
        return;
    }
    initFormMessage(form, message, "review-form__message");
}
async function initProduct() {
    let quantity = 1;
    const productBtn = document.querySelector(".product__btn");
    const size = document.querySelector("#size");
    const color = document.querySelector("#color");
    if (!productBtn || !size || !color) {
        return;
    }
    const productQuantity = document.querySelector(".product__quantity");
    const value = document.querySelector(".product__quantity-value");
    const title = document.querySelector(".product__title");
    const price = document.querySelector(".product__price");
    const rating = document.querySelector(".product__rating-stars");
    const img = document.querySelector(".product__img");
    if (!title || !price || !img || !rating || !value || !productQuantity) {
        return;
    }
    const id = new URLSearchParams(window.location.search).get("id");
    const productsAll = await getProducts();
    const product = productsAll.find(element => element.id === id) ?? productsAll[0];
    if (!product) {
        return;
    }
    title.textContent = product.name;
    price.textContent = `$${product.price}`;
    img.src = product.imageUrl;
    img.alt = product.name;
    rating.innerHTML = renderStars(product.rating, "product__rating-star")
        + `<span class="visually-hidden">Rating: ${product.rating} out of 5</span>`;
    productQuantity.addEventListener("click", (e) => {
        const button = e.target.closest("[data-action]");
        if (!button) {
            return;
        }
        if (button.dataset.action === "increase") {
            quantity += 1;
        }
        if (button.dataset.action === "decrease" && quantity > 1) {
            quantity -= 1;
        }
        value.textContent = String(quantity);
    });
    productBtn.addEventListener("click", () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            size: size.value || product.size,
            color: color.value || product.color,
            quantity: quantity,
        });
    });
    const list = document.querySelector(".related-products__list");
    if (!list) {
        return;
    }
    list.innerHTML = "";
    const filtered = productsAll.filter(item => item.id !== product.id);
    const related = getRandomProducts(filtered, 4);
    related.forEach(product => list.append(createProductCard(product, "related-products__item")));
    initAddToCart(productsAll);
}
function initTabs() {
    const buttons = document.querySelectorAll(".product-tabs__btn");
    const panels = document.querySelectorAll(".product-tabs__panel");
    if (!panels || !buttons) {
        return;
    }
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove("product-tabs__btn--active"));
            panels.forEach((panel) => panel.hidden = true);
            button.classList.add("product-tabs__btn--active");
            panels[index].hidden = false;
        });
    });
}
initProduct();
initTabs();
initReview();
//# sourceMappingURL=product.js.map