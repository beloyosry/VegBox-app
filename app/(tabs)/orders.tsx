import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { OrdersSkeleton } from "../../src/components/ui";
import { OrderCard } from "../../src/components/order";
import { useOrders } from "../../src/hooks/useOrders";
import { colors, fontSize, spacing } from "../../src/constants";

export default function OrdersScreen() {
    const router = useRouter();
    const { data: orders, isLoading, isFetching, refetch } = useOrders();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.error("Error refreshing orders:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleOrderPress = (orderId: string) => {
        router.push({
            pathname: "/order/[id]",
            params: { id: orderId },
        });
    };

    if (isLoading || isFetching) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Orders</Text>
                </View>
                <OrdersSkeleton count={5} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {isRefreshing ? (
                    <OrdersSkeleton count={orders?.length || 5} />
                ) : orders && orders.length > 0 ? (
                    <View style={styles.ordersContainer}>
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onPress={() => handleOrderPress(order.id)}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="receipt-outline"
                            size={80}
                            color={colors.gray[300]}
                        />
                        <Text style={styles.emptyTitle}>No orders yet</Text>
                        <Text style={styles.emptyText}>
                            Start shopping to create your first order
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
    },
    scrollContent: {
        flexGrow: 1,
    },
    ordersContainer: {
        padding: spacing.md,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
    },
    emptyTitle: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
    emptyText: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: "center",
    },
});
