export interface ProductsResponse { data: Product[]; }

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    color: string;
    size: string;
    salesStatus: boolean;
    rating: number;
    popularity: number;
    blocks: string[];
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    color: string;
    size: string;
    quantity: number;
}