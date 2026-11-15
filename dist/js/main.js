import { updateCartCounter } from "./cart-storage.js";
import { isValidEmail } from "./form.js";
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
function initLogin() {
    const accountBtn = document.querySelector(".header__actions-btn");
    const dialog = document.querySelector("#login-modal");
    const closeBtn = document.querySelector(".login__close");
    if (!accountBtn || !dialog || !closeBtn) {
        return;
    }
    accountBtn.addEventListener("click", () => {
        dialog.showModal();
    });
    closeBtn.addEventListener("click", () => {
        dialog.close();
    });
}
function initPasswordToggle() {
    const eye = document.querySelector(".login__eye");
    const password = document.querySelector("#login-password");
    if (!eye || !password) {
        return;
    }
    eye.addEventListener("click", () => {
        const show = password.type === "password";
        password.type = show ? "text" : "password";
        eye.setAttribute("aria-pressed", String(show));
        eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
}
function initLoginForm() {
    const email = document.querySelector("#login-email");
    const dialog = document.querySelector("#login-modal");
    const password = document.querySelector("#login-password");
    const message = document.querySelector(".login__message");
    const form = document.querySelector(".login__form");
    if (!email || !dialog || !password || !message || !form) {
        return;
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (isValidEmail(email.value) && password.value !== "") {
            form.reset();
            dialog.close();
            message.hidden = true;
        }
        else {
            message.textContent = "Enter a valid email and password.";
            message.hidden = false;
        }
    });
}
initBurger();
updateCartCounter();
initLogin();
initPasswordToggle();
initLoginForm();
//# sourceMappingURL=main.js.map