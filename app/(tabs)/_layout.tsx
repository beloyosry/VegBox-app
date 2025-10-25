import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import { borderRadius, colors, spacing } from "../../src/constants";
import { useCartStore } from "../../src/store";

const ActiveTabIcon = () => (
    <View
        style={{
            position: "absolute",
            bottom: -25,
            width: 0,
            height: 0,
            marginTop: 4,
            borderLeftWidth: 15,
            borderRightWidth: 15,
            borderBottomWidth: 15,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: colors.primary,
        }}
    />
);

export default function TabLayout() {
    const cartItems = useCartStore((state) => state.items);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.gray[400],
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: Platform.OS === "ios" ? 20 : 10,
                    paddingTop: 10,
                    marginHorizontal: spacing.md,
                    marginBottom: spacing.md,
                    borderRadius: borderRadius.full,
                    shadowColor: colors.black,
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && <ActiveTabIcon />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "grid" : "grid-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && <ActiveTabIcon />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: () => (
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                backgroundColor: colors.primary,
                                alignItems: "center",
                                justifyContent: "center",
                                shadowColor: colors.primary,
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 8,
                            }}
                        >
                            <Ionicons
                                name="cart"
                                size={30}
                                color={colors.white}
                            />
                            {cartItems.length > 0 && (
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 8,
                                        width: 18,
                                        height: 18,
                                        borderRadius: 9,
                                        backgroundColor: colors.secondary,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.white,
                                            fontSize: 10,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {cartItems.length}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "receipt" : "receipt-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && <ActiveTabIcon />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                size={26}
                                color={color}
                            />
                            {focused && <ActiveTabIcon />}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
