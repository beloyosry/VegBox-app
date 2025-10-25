import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useEffect, useState } from "react";
import { useColorScheme } from "../hooks/use-color-scheme";
import { QueryProvider } from "../src/providers/QueryProvider";
import { useAuthStore } from "../src/store";

export const unstable_settings = {
    anchor: "login",
};

function RootLayoutNav() {
    const segments = useSegments();
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Wait for Zustand persist to hydrate
        const timeout = setTimeout(() => {
            setIsReady(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === "(tabs)";
        const inLoginScreen = segments[0] === "login";

        if (!isAuthenticated && inAuthGroup) {
            router.replace("/login");
        } else if (isAuthenticated && inLoginScreen) {
            router.replace("/(tabs)");
        }
    }, [isAuthenticated, segments, isReady]);

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="categories" options={{ headerShown: false }} />
            <Stack.Screen
                name="product/[id]"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <QueryProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <RootLayoutNav />
                <StatusBar style="auto" />
            </ThemeProvider>
        </QueryProvider>
    );
}
