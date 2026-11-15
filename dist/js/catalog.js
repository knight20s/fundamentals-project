import { createProductCard, initAddToCart, getRandomProducts, renderStars } from "./card.js";
import { getProducts } from "./api.js";
const PRODUCTS_PER_PAGE = 12;
let currentProducts = [];
let currentPage = 1;
let allProducts = [];
function renderProducts(products) {
    const list = document.querySelector(".catalog__list");
    if (!list) {
        return;
    }
    list.innerHTML = "";
    products.forEach(product => list.append(createProductCard(product, "catalog__item")));
}
async function initCatalog() {
    const products = await getProducts();
    currentProducts = products;
    allProducts = products;
    showPage(products, 1);
    initAddToCart(products);
    const sets = products.filter((filter) => filter.category === "luggage sets");
    renderTopSets(getRandomProducts(sets, 5));
}
function showPage(product, page) {
    currentPage = page;
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const catalogResult = document.querySelector(".catalog-toolbar__results");
    if (!catalogResult) {
        return;
    }
    if (product.length === 0) {
        catalogResult.textContent = `No products found`;
    }
    else {
        catalogResult.textContent = `Showing ${start + 1}-${Math.min(end, product.length)} Of ${product.length} Results`;
    }
    renderProducts(product.slice(start, end));
    renderPagination(Math.ceil(product.length / PRODUCTS_PER_PAGE), page);
}
function renderPagination(totalPages, page) {
    const paginationList = document.querySelector(".pagination__list");
    const paginationBtnPrev = document.querySelector(".pagination__btn--prev");
    const paginationBtnNext = document.querySelector(".pagination__btn--next");
    if (!paginationList || !paginationBtnPrev || !paginationBtnNext) {
        return;
    }
    paginationBtnPrev.hidden = page === 1;
    paginationBtnNext.hidden = page >= totalPages;
    paginationList.textContent = "";
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("pagination__item");
        li.innerHTML = `
        <button class="pagination__page ${i === page ? "pagination__page--active" : ""}" type="button" ${i === page ? 'aria-current="page"' : ""} data-page="${i}" aria-label="Page ${i}">${i}
        </button>
        `;
        paginationList.append(li);
    }
}
function initPagination() {
    const pagination = document.querySelector(".pagination");
    if (!pagination) {
        return;
    }
    pagination.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) {
            return;
        }
        if (button.dataset.page) {
            showPage(currentProducts, Number(button.dataset.page));
        }
        if (button.classList.contains("pagination__btn--prev")) {
            showPage(currentProducts, currentPage - 1);
        }
        if (button.classList.contains("pagination__btn--next")) {
            showPage(currentProducts, currentPage + 1);
        }
    });
}
function sortProducts(products, sortType) {
    const productsCopy = [...products];
    if (sortType === "price-asc") {
        return productsCopy.sort((a, b) => a.price - b.price);
    }
    if (sortType === "price-desc") {
        return productsCopy.sort((a, b) => b.price - a.price);
    }
    if (sortType === "popularity") {
        return productsCopy.sort((a, b) => b.popularity - a.popularity);
    }
    if (sortType === "rating") {
        return productsCopy.sort((a, b) => b.rating - a.rating);
    }
    return productsCopy;
}
function initSort() {
    const sort = document.querySelector("#sort");
    if (!sort) {
        return;
    }
    sort.addEventListener("change", () => {
        updateCatalog();
    });
}
function updateCatalog() {
    const size = document.querySelector("#filter-size");
    const color = document.querySelector("#filter-color");
    const category = document.querySelector("#filter-category");
    const sort = document.querySelector("#sort");
    const sales = document.querySelector("#filter-sales");
    if (!color || !category || !size || !sales || !sort) {
        return;
    }
    const filtered = allProducts.filter((product) => {
        const sizeOk = !size.value || product.size.split(", ").includes(size.value);
        const colorOk = !color.value || product.color === color.value;
        const categoryOk = !category.value || product.category === category.value;
        const salesOk = !sales.checked || product.salesStatus === true;
        return sizeOk && colorOk && categoryOk && salesOk;
    });
    currentProducts = sortProducts(filtered, sort.value);
    showPage(currentProducts, 1);
}
function initFilters() {
    const sort = document.querySelector("#sort");
    const form = document.querySelector(".filter__form");
    const hide = document.querySelector("#filter-hide");
    const types = document.querySelector(".filter__types");
    if (!form || !hide || !types || !sort) {
        return;
    }
    form.addEventListener("change", () => {
        updateCatalog();
    });
    form.addEventListener("reset", () => {
        sort.value = "default";
        setTimeout(updateCatalog);
    });
    hide.addEventListener("click", () => {
        types.hidden = !types.hidden;
    });
}
function initSearch() {
    const form = document.querySelector(".search-form");
    const input = document.querySelector(".search-form__input");
    const notice = document.querySelector(".search-form__notice");
    if (!form || !input || !notice) {
        return;
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim().toLowerCase();
        if (!query) {
            return;
        }
        const found = allProducts.find((product) => product.name.toLowerCase().includes(query));
        if (found) {
            window.location.href = `/src/html/product.html?id=${found.id}`;
        }
        else {
            notice.hidden = false;
            setTimeout(() => {
                notice.hidden = true;
            }, 3000);
        }
    });
}
function renderTopSets(products) {
    const top = document.querySelector(".top-sets__list");
    if (!top) {
        return;
    }
    top.innerHTML = "";
    for (const product of products) {
        const li = document.createElement("li");
        li.classList.add("top-sets__item");
        li.innerHTML = `
            <img class="top-sets__product" src="${product.imageUrl}" alt="${product.name}">
                    <div class="top-sets__info">
                        <p class="top-sets__text">
                        ${product.name}
                        </p>
                        <div class="top-sets__stars" role="img" aria-label="Rating: ${product.rating} out of 5">
                            ${renderStars(product.rating, "top-sets__star")}
                        </div>
                        <p class="top-sets__price">
                            $${product.price}
                        </p>
                    </div>
        `;
        top.append(li);
    }
}
initCatalog();
initPagination();
initSort();
initFilters();
initSearch();
//# sourceMappingURL=catalog.js.map