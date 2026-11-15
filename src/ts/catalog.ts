import type {Product} from "./type.js";
import {createProductCard, initAddToCart} from "./card.js";
import {getProducts} from "./api.js";

const PRODUCTS_PER_PAGE = 12;
let currentProducts: Product[] = [];
let currentPage = 1;
let allProducts: Product[] = [];

function renderProducts(products: Product[]): void {
    const list = document.querySelector(".catalog__list");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    products.forEach(product => list.append(createProductCard(product, "catalog__item")))
}

async function initCatalog() {
    const products = await getProducts()
    currentProducts = products;
    allProducts = products;

    showPage(products, 1);
    initAddToCart(products);
}

function showPage(product: Product[], page: number): void {
    currentPage = page;

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const catalogResult = document.querySelector(".catalog-toolbar__results")

    if (!catalogResult) {
        return;
    }

    catalogResult.textContent = `Showing ${start + 1}-${Math.min(end, product.length)} Of ${product.length} Results`;

    renderProducts(product.slice(start, end));
    renderPagination(Math.ceil(product.length / PRODUCTS_PER_PAGE), page);
}

function renderPagination(totalPages: number, page: number): void {
    const paginationList = document.querySelector(".pagination__list");
    const paginationBtnPrev = document.querySelector<HTMLElement>(".pagination__btn--prev");
    const paginationBtnNext = document.querySelector<HTMLElement>(".pagination__btn--next");

    if (!paginationList || !paginationBtnPrev || !paginationBtnNext) {
        return;
    }

    paginationBtnPrev.hidden = page === 1;
    paginationBtnNext.hidden = page === totalPages;

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

function initPagination(): void {
    const pagination = document.querySelector(".pagination");

    if (!pagination) {
        return;
    }

    pagination.addEventListener("click", (e) => {
        const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button");

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

function sortProducts(products: Product[], sortType: string): Product[] {
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

function initSort(): void {
    const sort = document.querySelector<HTMLSelectElement>("#sort");

    if (!sort) {
        return;
    }

    sort.addEventListener("change", () => {
        currentProducts = sortProducts(allProducts, sort.value);
        showPage(currentProducts, 1);
    })
}

function updateCatalog(): void{
    const size = document.querySelector<HTMLSelectElement>("#filter-size");
    const color = document.querySelector<HTMLSelectElement>("#filter-color");
    const category = document.querySelector<HTMLSelectElement>("#filter-category");
    const sales = document.querySelector<HTMLSelectElement>("#filter-sales");
    const sort = document.querySelector<HTMLSelectElement>("#sort");

    if (!color || !category || !size || !sales || !sort) {
        return;
    }


}

initCatalog();
initPagination();
initSort();