import { Review } from "./review.model";

interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    rating: Rating;
}

export interface ProductWithReviews extends Product {
    reviews?: Review[];
}