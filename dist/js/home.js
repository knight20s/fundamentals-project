import { getProducts } from "./api.js";
import { createProductCard, initAddToCart } from "./card.js";
const SLIDER_PHRASES = [
    "Pack light, travel far",
    "Your next trip starts here",
    "Made for every journey",
    "Ready for the airport",
];
function renderBlock(products, listSelector, blockName, itemClass) {
    const list = document.querySelector(listSelector);
    if (!list) {
        return;
    }
    const blockProducts = products.filter((product) => product.blocks.includes(blockName));
    list.innerHTML = "";
    blockProducts.forEach((product) => {
        list.append(createProductCard(product, itemClass));
    });
}
async function initHome() {
    const products = await getProducts();
    renderBlock(products, ".products__list", "Selected Products", "products__item");
    renderBlock(products, ".arrival__list", "New Products Arrival", "arrival__item");
    initAddToCart(products);
}
function initSlider() {
    const list = document.querySelector(".slider__list");
    const controls = document.querySelector(".travel__controls");
    if (!list || !controls) {
        return;
    }
    controls.addEventListener("click", (e) => {
        const button = e.target.closest("[data-direction]");
        if (!button) {
            return;
        }
        if (button.dataset.direction === "next") {
            const first = list.firstElementChild;
            if (first) {
                list.append(first);
            }
        }
        if (button.dataset.direction === "prev") {
            const last = list.lastElementChild;
            if (last) {
                list.prepend(last);
            }
        }
    });
}
function initRandomText() {
    const title = document.querySelectorAll(".slider__title");
    title.forEach(title => {
        title.textContent = SLIDER_PHRASES[Math.floor(Math.random() * SLIDER_PHRASES.length)];
    });
}
initSlider();
initHome();
initRandomText();
//# sourceMappingURL=home.js.map