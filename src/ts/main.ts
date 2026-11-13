import {updateCartCounter} from "./cart-storage.js";

function initBurger() {
    const menuBurger = document.querySelector(".header__burger");
    if (!menuBurger) {
        return;
    }

    const menu = document.querySelector("#header-menu");

    if (!menu) {
        return;
    }

    menuBurger.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("header__bottom--open");
        menuBurger.setAttribute("aria-expanded", String(isOpen));
    });
}

initBurger();
updateCartCounter();