import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "../src/hooks/use-color-scheme";
import { QueryProvider } from "../src/providers/QueryProvider";
import { useAuthStore } from "../src/store";

export const unstable_settings = {
    anchor: "login",
};

const logAsyncStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        const formatted: Record<string, any> = {};

        items.forEach(([key, value]) => {
            try {
                // حاول نفك الـ JSON، لو فشل نخليه نص عادي
                formatted[key] = JSON.parse(value as string);
            } catch {
                formatted[key] = value;
            }
        });

        console.log(
            "📦 AsyncStorage contents:",
            JSON.stringify(formatted, null, 2)
        );
    } catch (error) {
        console.error("❌ Error fetching AsyncStorage contents:", error);
    }
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
    }, [isAuthenticated, segments, isReady, router]);

    useEffect(() => {
        logAsyncStorage();
        // AsyncStorage.clear();
    }, [AsyncStorage]);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="categories" options={{ headerShown: false }} />
            <Stack.Screen
                name="product/[id]"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
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
