export async function getProducts() {
    const response = await fetch("/src/assets/data.json");
    if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`);
    }
    const json = await response.json();
    return json.data;
}
//# sourceMappingURL=api.js.map