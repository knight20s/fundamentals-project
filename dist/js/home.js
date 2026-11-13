import { getProducts } from "./api.js";
import { createProductCard, initAddToCart } from "./card.js";
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
initHome();
//# sourceMappingURL=home.js.map