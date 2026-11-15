import {initFormMessage, isValidEmail} from "./form.js";

function initContact(): void {
    const form = document.querySelector<HTMLFormElement>(".feedback__form");
    const message = document.querySelector<HTMLElement>(".feedback__message");
    const email = document.querySelector<HTMLInputElement>("#contact-mail");

    if (!form || !message || !email) {
        return;
    }

    initFormMessage(form, message, "feedback__message");

    email.addEventListener("input", () => {
        const invalid = email.value !== "" && !isValidEmail(email.value);

        email.classList.toggle("feedback__input--invalid", invalid);
        email.setCustomValidity(invalid ? "Invalid email" : "");
    });
}

initContact();
