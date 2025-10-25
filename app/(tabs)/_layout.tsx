// eslint-disable-next-line import/no-unresolved
import CartCounter from "@/src/components/cart/CartCounter";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { borderRadius, colors, Icons, spacing } from "../../src/constants";

const ActiveTabIcon = () => {
    const { ActiveIconIndicator } = Icons();

    return (
        <View
            style={{
                position: "absolute",
                bottom: -28,
            }}
        >
            <ActiveIconIndicator />
        </View>
    );
};

export default function TabLayout() {
    const { HomeIcon, CategoryIcon, OrdersIcon, ProfileIcon } = Icons();

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
                            <HomeIcon
                                isActive={focused}
                                color={focused ? color : colors.inactiveIcon}
                                width={26}
                                height={26}
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
                            <CategoryIcon
                                isActive={focused}
                                color={focused ? color : colors.inactiveIcon}
                                width={26}
                                height={26}
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
                    tabBarStyle: { display: "none" },
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
                            <CartCounter
                                cartIcon={{
                                    color: colors.white,
                                    size: 25,
                                }}
                            />
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
                            <OrdersIcon
                                isActive={focused}
                                color={focused ? color : colors.inactiveIcon}
                                width={26}
                                height={26}
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
                            <ProfileIcon
                                isActive={focused}
                                color={focused ? color : colors.inactiveIcon}
                                width={26}
                                height={26}
                            />
                            {focused && <ActiveTabIcon />}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
