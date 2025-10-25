# VegBox - E-commerce Mobile App

A modern e-commerce mobile application built with React Native, TypeScript, Expo Router, Zustand, and TanStack Query.

## 🚀 Features

-   **Authentication**: Simple login flow with predefined credentials
-   **Product Catalog**: Browse products by categories with flash sales and special offers
-   **Product Details**: View detailed product information with images and descriptions
-   **Shopping Cart**: Add/remove items, adjust quantities, and manage selections
-   **Order Placement**: Simulated checkout process with order confirmation
-   **Responsive Design**: Works seamlessly on both iOS and Android devices
-   **Clean Architecture**: SOLID principles with separated concerns

## 📋 Requirements Met

✅ React Native with TypeScript  
✅ Mock data with simulated API delays  
✅ Login flow with validation (test@test.com / 123456)  
✅ Product listing and details  
✅ Cart management in app state  
✅ Responsive across screen sizes  
✅ iOS and Android compatibility  
✅ Validation, error handling, and loading states  
✅ Reusable components and clean structure  
✅ Zustand for state management  
✅ TanStack Query for data fetching  
✅ Axios for HTTP client

## 🏗️ Project Structure

```
VegBox-app/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── categories.tsx       # Categories tab
│   │   ├── cart.tsx             # Cart tab placeholder
│   │   ├── orders.tsx           # Orders screen
│   │   └── profile.tsx          # Profile screen
│   ├── product/[id].tsx         # Product detail screen
│   ├── cart.tsx                 # Cart screen
│   ├── categories.tsx           # Categories screen
│   ├── login.tsx                # Login screen
│   └── _layout.tsx              # Root layout with navigation
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── product/             # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   └── index.ts
│   │   └── cart/                # Cart components
│   │       ├── CartItem.tsx
│   │       └── index.ts
│   ├── config/                  # Configuration files
│   │   ├── api.config.ts        # Axios instance & interceptors
│   │   ├── api-helper.config.ts # CRUD helper functions
│   │   └── index.ts
│   ├── constants/               # App constants
│   │   ├── colors.constants.ts  # Color system
│   │   ├── spacing.constants.ts # Spacing, fonts, etc.
│   │   └── index.ts
│   ├── data/                    # Mock data
│   │   └── mock-data.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hooks
│   │   └── useProducts.ts       # Product query hooks
│   ├── providers/               # Context providers
│   │   └── QueryProvider.tsx    # TanStack Query provider
│   ├── services/                # API service layer
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   └── index.ts
│   ├── store/                   # Zustand stores
│   │   ├── auth.store.ts        # Authentication state
│   │   ├── cart.store.ts        # Cart state
│   │   └── index.ts
│   └── types/                   # TypeScript types
│       ├── auth.types.ts
│       ├── product.types.ts
│       ├── cart.types.ts
│       └── index.ts
└── package.json
```

## 🎨 Design System

### Color System

-   **Primary**: #68B984 (Green)
-   **Secondary**: #FF6B6B (Red)
-   **Background**: #FFFFFF
-   **Text**: Hierarchical gray scale

All colors are centralized in `src/constants/colors.constants.ts` for easy theming.

### Spacing & Typography

-   Consistent spacing scale (xs, sm, md, lg, xl, xxl)
-   Typography system with predefined font sizes
-   Border radius system for consistent UI

## 🔐 Login Credentials

```
Phone Number: 012345678910
Password: 123456
```

Any other credentials will be rejected with an error message. The app uses phone number authentication as shown in the UI, but internally validates against the mock credentials.

## 📱 Screens

1. **Login Screen**: Authentication with validation
2. **Home Screen**: Categories, flash sales, today's specials, recipes
3. **Categories Screen**: Grid view of all product categories
4. **Product Detail Screen**: Full product information with add to cart
5. **Cart Screen**: Manage cart items, select items, checkout
6. **Profile Screen**: User information and logout

## 🛠️ Technologies Used

-   **React Native**: Cross-platform mobile framework
-   **TypeScript**: Type-safe development
-   **Expo Router**: File-based routing
-   **Zustand**: Lightweight state management
-   **TanStack Query**: Server state management
-   **Axios**: HTTP client
-   **Expo Vector Icons**: Icon library

## 🚦 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Expo CLI
-   iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on specific platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🎯 Key Features Implementation

### State Management (Zustand)

-   **Auth Store**: Manages user authentication state
-   **Cart Store**: Handles cart operations (add, remove, update quantity, select items)

### Data Fetching (TanStack Query)

-   Automatic caching and background updates
-   Loading and error states
-   Optimistic updates

### API Simulation

-   All API calls have a 1-second delay to simulate real network requests
-   Mock data for products, categories, and recipes
-   Simulated order creation

### SOLID Principles

-   **Single Responsibility**: Each component/service has one clear purpose
-   **Open/Closed**: Components are extensible without modification
-   **Liskov Substitution**: Type-safe interfaces
-   **Interface Segregation**: Focused, minimal interfaces
-   **Dependency Inversion**: Services depend on abstractions

## 📝 Code Quality

-   **TypeScript**: Full type safety across the application
-   **Modular Structure**: Easy to maintain and extend
-   **Reusable Components**: DRY principle applied
-   **Centralized Styling**: Dynamic color system
-   **Error Handling**: Comprehensive error states
-   **Loading States**: User feedback during async operations

## 🔄 Data Flow

1. **UI Components** → Call hooks from `src/hooks`
2. **Hooks** → Use TanStack Query to call services
3. **Services** → Simulate API calls with mock data
4. **Mock Data** → Returns predefined data with delay
5. **State Management** → Zustand stores for global state

## 🎭 Mock Operations

All operations are fully functional with simulated delays:

-   Login/Logout
-   Product browsing
-   Add to cart
-   Update quantities
-   Checkout process
-   Order creation

## 📦 Build for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## 🤝 Contributing

This is a demo project. Feel free to fork and modify as needed.

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built with ❤️ using React Native and TypeScript**
