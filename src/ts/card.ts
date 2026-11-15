import type {Product} from "./type.js";
import {addToCart} from "./cart-storage.js";

export function createProductCard(product: Product, itemClass: string): HTMLLIElement {
    const li = document.createElement("li");
    li.className = itemClass;
    li.innerHTML = `
<article class="products-card">
<a class="products-card__link" href="/src/html/product.html?id=${product.id}">
<img class="products-card__img" src="${product.imageUrl}" alt="${product.name}">
${product.salesStatus ? '<span class="products-card__badge">sale</span>' : ""}
<h3 class="products-card__title">${product.name}</h3>
<p class="products-card__price">$${product.price}</p>
</a>
<button class="products-card__btn btn btn--small" type="button" data-id="${product.id}">Add To Cart</button>
</article>
  `;

    return li;
}

export function initAddToCart(products: Product[]): void {
    document.addEventListener("click", (event) => {
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>(".products-card__btn");

        if (!button) {
            return;
        }

        const buttonId = button.dataset.id;

        const foundProduct = products.find((product) => product.id === buttonId);

        if (!foundProduct) {
            return;
        }

        addToCart({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
            imageUrl: foundProduct.imageUrl,
            size: foundProduct.size,
            color: foundProduct.color,
            quantity: 1,
        });
    })
}

export function getRandomProducts(products: Product[], count: number): Product[] {
    const productsCopy = [...products];
    productsCopy.sort(() => Math.random() - 0.5);
    return productsCopy.slice(0, count);
}

export function renderStars(rating: number, starClass: string): string{
    const filled = Math.round(rating);
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        const icon = i <= filled ? "star.svg" : "star-muted.svg";
        stars += `<img class="${starClass}" src="/src/img/icons/${icon}" alt="">`;
    }

    return stars;
}
