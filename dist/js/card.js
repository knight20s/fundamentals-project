import { addToCart } from "./cart-storage.js";
export function createProductCard(product, itemClass) {
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
export function initAddToCart(products) {
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".products-card__btn");
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
    });
}
//# sourceMappingURL=card.js.map