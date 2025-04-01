export interface ProductFilter {
    priceMin?: number;
    priceMax?: number; 
    ratingMin?: number;
    ratingMax?: number;
    inStock?: boolean;
    hasReviews?: boolean;
};