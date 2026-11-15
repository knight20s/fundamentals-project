const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
    return EMAIL_REGEX.test(value);
}

export function initFormMessage(form: HTMLFormElement, message: HTMLElement, messageClass: string): void {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        message.classList.remove(`${messageClass}--success`);
        message.classList.remove(`${messageClass}--error`);

        if (form.checkValidity()) {
            message.textContent = 'Thank you! Your message has been sent.';
            message.classList.add(`${messageClass}--success`);
            form.reset();
        } else {
            message.textContent = 'Please fill in all required fields correctly.';
            message.classList.add(`${messageClass}--error`);
        }

        message.hidden = false;
    })
}