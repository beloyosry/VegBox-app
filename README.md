# VegBox - Fresh Vegetables Delivery App

VegBox is a mobile e-commerce app for ordering fresh vegetables and groceries. Built with React Native and Expo, it features a complete shopping experience with cart management, user authentication, order tracking, and profile management.

## Features

- **User Authentication** - Login system with persistent sessions
- **Product Browsing** - Browse vegetables by categories with detailed product pages
- **Shopping Cart** - Add items to cart, adjust quantities, and manage your order
- **Checkout Flow** - Complete checkout with address selection and order placement
- **Order History** - Track your current and past orders
- **User Profile** - Manage personal info, addresses, and payment methods
- **Splash Screen** - Custom branded splash screen on app launch

## Tech Stack

### Core
- **React Native** (0.81.5) - Mobile framework
- **Expo** (~54.0) - Development platform
- **TypeScript** - Type safety
- **Expo Router** - File-based navigation

### State Management & Data
- **Zustand** - Lightweight state management for cart, auth, orders, and profile
- **TanStack Query** - Server state management and caching
- **AsyncStorage** - Local data persistence

### UI & Animations
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Vector Icons** - Icon library
- **React Native SVG** - SVG support

### Navigation
- **React Navigation** - Bottom tabs and stack navigation
- **Expo Router** - File-based routing system

### API & Networking
- **Axios** - HTTP client for API calls

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` to open Android emulator
   - Press `i` to open iOS simulator
   - Press `w` to open in web browser

## Project Structure

```
VegBox-app/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Bottom tab navigation screens
│   │   ├── index.tsx      # Home/Products screen
│   │   ├── categories.tsx # Categories screen
│   │   ├── cart.tsx       # Shopping cart
│   │   ├── orders.tsx     # Order history
│   │   └── profile.tsx    # User profile
│   ├── login.tsx          # Login screen
│   ├── checkout.tsx       # Checkout flow
│   ├── product/[id].tsx   # Product details
│   ├── category/[id].tsx  # Category products
│   └── order/[id].tsx     # Order details
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── cart/         # Cart-related components
│   │   ├── product/      # Product cards and lists
│   │   ├── order/        # Order components
│   │   └── ui/           # Generic UI components
│   ├── store/            # Zustand state stores
│   │   ├── auth.store.ts
│   │   ├── cart.store.ts
│   │   ├── order.store.ts
│   │   └── profile.store.ts
│   ├── services/         # API service layer
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   └── order.service.ts
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # App constants and theme
│   ├── hooks/            # Custom React hooks
│   └── config/           # App configuration
└── assets/               # Images, fonts, and static files
```

## Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## Key Features Implementation

- **State Management**: Using Zustand for global state (cart, auth, profile, orders)
- **API Integration**: Axios-based service layer with TanStack Query for data fetching
- **Routing**: File-based routing with Expo Router and typed routes
- **Persistence**: AsyncStorage for keeping user logged in between sessions
- **Animations**: Reanimated for smooth transitions and interactions
- **Type Safety**: Full TypeScript implementation across the app
