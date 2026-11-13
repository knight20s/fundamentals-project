import type {Product} from "./type.js";
import {ProductsResponse} from "./type.js"

export async function getProducts(): Promise<Product[]> {
    const response = await fetch("/src/assets/data.json");

    if (!response.ok){
        throw new Error(`Failed to load products: ${response.status}`)
    }

    const json: ProductsResponse = await response.json();
    return json.data;
}