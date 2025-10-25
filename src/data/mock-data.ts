import { images } from "../constants/images.constants";
import { Category, Product, Recipe } from "../types";

export const mockCategories: Category[] = [
    {
        id: "1",
        name: "Vegetables",
        icon: "🥦",
        image: images.categories.vegetables,
        productCount: 0, // Calculated dynamically
        color: "#E8F5E9",
    },
    {
        id: "2",
        name: "Fruits",
        icon: "🍌",
        image: images.categories.fruits,
        productCount: 0, // Calculated dynamically
        color: "#FFF9C4",
    },
    {
        id: "3",
        name: "Chicken",
        icon: "🍗",
        image: images.categories.chicken,
        productCount: 0, // Calculated dynamically
        color: "#FFEBEE",
    },
    {
        id: "4",
        name: "Beef",
        icon: "🥩",
        image: images.categories.beef,
        productCount: 0, // Calculated dynamically
        color: "#FFE0B2",
    },
    {
        id: "5",
        name: "Protein",
        icon: "🥚",
        image: images.categories.protein,
        productCount: 0, // Calculated dynamically
        color: "#F5F5F5",
    },
    {
        id: "6",
        name: "Seafood",
        icon: "🦞",
        image: images.categories.seafood,
        productCount: 0, // Calculated dynamically
        color: "#FFE0B2",
    },
];

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Chicken breast frozen",
        description:
            "Fresh chicken breast, perfect for grilling or baking. High in protein and low in fat.",
        price: 22.4,
        originalPrice: 23.0,
        discount: 30,
        image: images.products.chickenBreast,
        category: "3", // Chicken
        unit: "pack",
        weight: "450-500g",
        inStock: true,
        rating: 4.5,
        reviews: 128,
    },
    {
        id: "2",
        name: "Chicken breast frozen",
        description:
            "Premium frozen chicken breast, individually packed for convenience.",
        price: 13.0,
        originalPrice: 20.0,
        discount: 35,
        image: images.products.chickenFrozen,
        category: "3", // Chicken
        unit: "pack",
        weight: "473-1kg",
        inStock: true,
        rating: 4.7,
        reviews: 256,
    },
    {
        id: "3",
        name: "Beef meat soup",
        description:
            "Premium beef cuts ideal for making rich, flavorful soups and stews.",
        price: 30.0,
        originalPrice: 38.0,
        discount: 21,
        image: images.products.beefSoup,
        category: "4", // Beef
        unit: "pack",
        weight: "500-700g",
        inStock: true,
        rating: 4.8,
        reviews: 89,
    },
    {
        id: "4",
        name: "Australia beef tenderloin",
        description:
            "In terms of quality, look for well-marbled tenderloin, where fat is interspersed within the muscle. This marbling enhances the flavor and juiciness when cooked. A high-quality tenderloin should have a vibrant red color with a fine grain. When cooked properly, it should be tender and melt in your mouth.",
        price: 40.0,
        originalPrice: 50.0,
        discount: 20,
        image: images.products.beefTenderloin,
        category: "4", // Beef
        unit: "pack",
        weight: "450-500g",
        origin: "Import",
        condition: "Fresh",
        fatContent: "Non Fatty",
        inStock: true,
        rating: 4.9,
        reviews: 342,
    },
    {
        id: "5",
        name: "Omega chicken eggs",
        description: "Farm-fresh omega-3 enriched eggs, packed with nutrients.",
        price: 15.0,
        image: images.products.eggs,
        category: "5", // Protein
        unit: "pack",
        weight: "100-1kg",
        inStock: true,
        rating: 4.6,
        reviews: 178,
    },
    {
        id: "6",
        name: "Cavendish baby banana",
        description: "Sweet and creamy baby bananas, perfect for snacking.",
        price: 9.0,
        image: images.products.banana,
        category: "2", // Fruits
        unit: "pack",
        weight: "340-500g",
        inStock: true,
        rating: 4.4,
        reviews: 95,
    },
];

export const mockRecipes: Recipe[] = [
    {
        id: "1",
        name: "Classic spaghetti bolognese",
        image: images.recipes.spaghetti,
        prepTime: 18,
        category: "Italian",
    },
    {
        id: "2",
        name: "Quick beef rice bowl",
        image: images.recipes.riceBowl,
        prepTime: 15,
        category: "Asian",
    },
    {
        id: "3",
        name: "Morning healthy salad",
        image: images.recipes.salad,
        prepTime: 5,
        category: "Healthy",
    },
];

export const mockUser = {
    id: "1",
    email: "test@test.com",
    name: "Dexter",
    phone: "012345678910",
};

export const validCredentials = {
    email: "test@test.com",
    password: "123456",
    phone: "012345678910",
};
