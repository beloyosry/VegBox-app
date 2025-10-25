import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CartItem } from "../../src/components/cart";
import { Button, CartSkeleton } from "../../src/components/ui";
import { colors, fontSize, spacing } from "../../src/constants";
import { orderService } from "../../src/services";
import { useCartStore } from "../../src/store";

export default function CartTabScreen() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const {
        items,
        updateQuantity,
        toggleItemSelection,
        selectAll,
        getSelectedTotal,
        clearSelectedItems,
    } = useCartStore();

    const selectedTotal = getSelectedTotal();
    const hasSelectedItems = items.some((item) => item.selected);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            // Simulate refresh delay - in a real app, this would sync with backend
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // You could fetch updated cart data from backend here
        } catch (error) {
            console.error("Error refreshing cart:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleCheckout = async () => {
        if (!hasSelectedItems) {
            Alert.alert("No items selected", "Please select items to checkout");
            return;
        }

        setIsProcessing(true);
        try {
            const selectedItems = items.filter((item) => item.selected);

            // Create the order
            const order = await orderService.createOrder(
                selectedItems,
                selectedTotal
            );

            // Clear selected items from cart after successful order
            clearSelectedItems();

            Alert.alert(
                "Order Placed Successfully! 🎉",
                `Your order ${
                    order.id
                } has been placed.\nTotal: $${order.total.toFixed(2)}`,
                [
                    {
                        text: "View Orders",
                        onPress: () => router.push("/(tabs)/orders"),
                    },
                    {
                        text: "Continue Shopping",
                        style: "cancel",
                    },
                ]
            );
        } catch (error) {
            console.error("Checkout error:", error);
            Alert.alert(
                "Order Failed",
                "Failed to place order. Please try again.",
                [{ text: "OK" }]
            );
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text.primary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Cart</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.emptyContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                >
                    <Ionicons
                        name="cart-outline"
                        size={80}
                        color={colors.gray[300]}
                    />
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>
                        Add items to get started
                    </Text>
                    <Button
                        title="Start Shopping"
                        onPress={() => router.push("/(tabs)")}
                        style={styles.shopButton}
                    />
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.text.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cart ({items.length})</Text>
                <TouchableOpacity onPress={selectAll}>
                    <Text style={styles.selectAllText}>
                        {items.every((item) => item.selected)
                            ? "Deselect All"
                            : "Select All"}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {isRefreshing ? (
                    <CartSkeleton count={items.length || 3} />
                ) : (
                    <>
                        {items.map((item) => (
                            <CartItem
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={(quantity) =>
                                    updateQuantity(item.product.id, quantity)
                                }
                                onToggleSelect={() =>
                                    toggleItemSelection(item.product.id)
                                }
                            />
                        ))}
                        <View style={{ height: 120 }} />
                    </>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>
                        ${selectedTotal.toFixed(2)}
                    </Text>
                </View>
                <Button
                    title={isProcessing ? "Processing..." : "Checkout"}
                    onPress={handleCheckout}
                    disabled={!hasSelectedItems || isProcessing}
                    style={styles.checkoutButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: fontSize.xl,
        fontWeight: "700",
        color: colors.text.primary,
    },
    selectAllText: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: "600",
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.xl,
    },
    emptyTitle: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
    emptySubtitle: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        marginBottom: spacing.xl,
    },
    shopButton: {
        minWidth: 200,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingBottom: 80,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.md,
    },
    totalLabel: {
        fontSize: fontSize.lg,
        fontWeight: "600",
        color: colors.text.secondary,
    },
    totalAmount: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.primary,
    },
    checkoutButton: {
        width: "100%",
    },
});
