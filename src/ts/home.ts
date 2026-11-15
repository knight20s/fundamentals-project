import {getProducts} from "./api.js";
import {createProductCard, initAddToCart} from "./card.js";
import type {Product} from "./type.js";

const SLIDER_PHRASES = [
    "Pack light, travel far",
    "Your next trip starts here",
    "Made for every journey",
    "Ready for the airport",
];

function renderBlock(products: Product[], listSelector: string, blockName: string, itemClass: string) {
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

function initSlider(): void {
    const list = document.querySelector<HTMLElement>(".slider__list");
    const controls = document.querySelector<HTMLElement>(".travel__controls");

    if(!list || !controls) {
        return;
    }

    controls.addEventListener("click", (e) => {
        const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-direction]");

        if(!button) {
            return;
        }

        if(button.dataset.direction === "next"){
            const first = list.firstElementChild;
            if(first) {
                list.append(first);
            }
        }

        if(button.dataset.direction === "prev"){
            const last = list.lastElementChild
            if(last) {
                list.prepend(last);
            }
        }
    })
}

function initRandomText(): void{
    const title = document.querySelectorAll<HTMLElement>(".slider__title");

    title.forEach(title => {
        title.textContent = SLIDER_PHRASES[Math.floor(Math.random() * SLIDER_PHRASES.length)];
    })
}

initSlider();
initHome();
initRandomText();

