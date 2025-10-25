import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedImage from "../src/components/themed-image";
import { Button } from "../src/components/ui";
import { borderRadius, colors, fontSize, spacing } from "../src/constants";
import { orderService } from "../src/services";
import { useCartStore, useProfileStore } from "../src/store";

export default function CheckoutScreen() {
    const router = useRouter();
    const { items, getSelectedTotal } = useCartStore();
    const { addresses } = useProfileStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [shippingOption, setShippingOption] = useState<
        "standard" | "priority"
    >("standard");

    const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];

    const selectedItems = items.filter((item) => item.selected);
    const subtotal = getSelectedTotal();
    const taxes = subtotal * 0.1; // 10% tax
    const serviceFee = 5.0;
    const deliveryFee = shippingOption === "priority" ? 15.0 : 0.0;
    const total = subtotal + taxes + serviceFee + deliveryFee;

    const handleProceedToPayment = async () => {
        if (selectedItems.length === 0) {
            Alert.alert("No items", "Please select items to checkout");
            return;
        }

        setIsProcessing(true);
        try {
            const order = await orderService.createOrder(selectedItems, total);

            // Navigate to success screen with order details
            router.push({
                pathname: "/order-success",
                params: {
                    orderId: order.id,
                    total: total.toFixed(2),
                },
            });
        } catch (error) {
            console.error("Checkout error:", error);
            Alert.alert("Error", "Failed to process order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

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
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Delivery Address */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="location"
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.sectionTitle}>
                            Delivery address
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/profile/addresses")}
                        >
                            <Text style={styles.actionText}>
                                {defaultAddress?.label || "Add"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {defaultAddress ? (
                        <>
                            <Text style={styles.addressText}>
                                {defaultAddress.address}
                            </Text>
                            <TouchableOpacity
                                style={styles.contactRow}
                                onPress={() =>
                                    router.push("/profile/addresses")
                                }
                            >
                                <Text style={styles.contactName}>
                                    {defaultAddress.name}
                                </Text>
                                <Text style={styles.contactPhone}>
                                    {defaultAddress.phone}
                                </Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.addAddressButton}
                            onPress={() => router.push("/profile/addresses")}
                        >
                            <Text style={styles.addAddressText}>
                                Add delivery address
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Shipping Schedule */}
                <TouchableOpacity style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="calendar"
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.sectionTitle}>
                            Shipping schedule
                        </Text>
                        <Text style={styles.actionText}>Now</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.secondary}
                        />
                    </View>
                </TouchableOpacity>

                {/* Shipping Duration */}
                <View style={styles.shippingSection}>
                    <Text style={styles.shippingTitle}>Shipping duration</Text>

                    <TouchableOpacity
                        style={[
                            styles.shippingOption,
                            shippingOption === "standard" &&
                                styles.shippingOptionActive,
                        ]}
                        onPress={() => setShippingOption("standard")}
                    >
                        <View>
                            <Text style={styles.shippingOptionTitle}>
                                Standard
                            </Text>
                            <Text style={styles.shippingOptionSubtitle}>
                                Free
                            </Text>
                        </View>
                        <Text style={styles.shippingOptionTime}>2 hours</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.shippingOption,
                            styles.priorityOption,
                            shippingOption === "priority" &&
                                styles.shippingOptionActive,
                        ]}
                        onPress={() => setShippingOption("priority")}
                    >
                        <View style={styles.priorityHeader}>
                            <Ionicons
                                name="flash"
                                size={20}
                                color={colors.primary}
                            />
                            <Text style={styles.shippingOptionTitle}>
                                Priority
                            </Text>
                        </View>
                        <View style={styles.priorityDetails}>
                            <Text style={styles.priorityPrice}>+$15.00</Text>
                            <Text style={styles.shippingOptionTime}>
                                20-40 minutes
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Order Items */}
                <View style={styles.itemsSection}>
                    {selectedItems.map((item, index) => (
                        <View key={index} style={styles.itemCard}>
                            <View style={styles.itemImage}>
                                <ThemedImage
                                    source={item.product.image}
                                    style={styles.productImage}
                                />
                                {item.product.discount &&
                                    item.product.discount > 0 && (
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>
                                                {item.product.discount}%
                                            </Text>
                                        </View>
                                    )}
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>
                                    {item.product.name}
                                </Text>
                                <Text style={styles.itemWeight}>
                                    {item.product.weight}/{item.product.unit}
                                </Text>
                                <Text style={styles.itemPrice}>
                                    ${item.product.price.toFixed(2)}
                                </Text>
                            </View>
                            <Text style={styles.itemQuantity}>
                                {item.quantity} pcs
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Special Request */}
                <TouchableOpacity style={styles.specialRequestSection}>
                    <View style={styles.specialRequestHeader}>
                        <Ionicons
                            name="create-outline"
                            size={20}
                            color={colors.primary}
                        />
                        <Text style={styles.specialRequestText}>
                            Got a special request?{" "}
                            <Text style={styles.specialRequestLink}>
                                Write a notes
                            </Text>
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.text.secondary}
                    />
                </TouchableOpacity>

                {/* Order Summary */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            ${subtotal.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Taxes</Text>
                        <Text style={styles.summaryValue}>
                            ${taxes.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service fee</Text>
                        <Text style={styles.summaryValue}>
                            ${serviceFee.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery fee</Text>
                        <Text style={styles.summaryValue}>
                            ${deliveryFee.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={
                        isProcessing ? "Processing..." : "Proceed to Payment"
                    }
                    onPress={handleProceedToPayment}
                    disabled={isProcessing || selectedItems.length === 0}
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
    scrollView: {
        flex: 1,
    },
    section: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginTop: spacing.md,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.sm,
    },
    sectionTitle: {
        flex: 1,
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    actionText: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: "600",
        marginRight: spacing.xs,
    },
    addressText: {
        fontSize: fontSize.md,
        color: colors.text.primary,
        marginBottom: spacing.sm,
        lineHeight: 22,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    contactName: {
        flex: 1,
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    contactPhone: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginRight: spacing.xs,
    },
    addAddressButton: {
        paddingVertical: spacing.md,
        alignItems: "center",
    },
    addAddressText: {
        fontSize: fontSize.md,
        color: colors.primary,
        fontWeight: "600",
    },
    shippingSection: {
        padding: spacing.md,
        marginTop: spacing.md,
    },
    shippingTitle: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    shippingOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
        borderWidth: 2,
        borderColor: colors.border,
    },
    shippingOptionActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },
    shippingOptionTitle: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    shippingOptionSubtitle: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginTop: 2,
    },
    shippingOptionTime: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    priorityOption: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    priorityHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    priorityDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    priorityPrice: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    itemsSection: {
        padding: spacing.md,
    },
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.sm,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        backgroundColor: colors.gray[100],
        overflow: "hidden",
        marginRight: spacing.md,
        position: "relative",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    discountBadge: {
        position: "absolute",
        top: 4,
        left: 4,
        backgroundColor: colors.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    discountText: {
        fontSize: fontSize.xs,
        fontWeight: "700",
        color: colors.white,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    itemWeight: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    itemPrice: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.primary,
    },
    itemQuantity: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    specialRequestSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
    },
    specialRequestHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        flex: 1,
    },
    specialRequestText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    specialRequestLink: {
        color: colors.primary,
        fontWeight: "600",
    },
    summarySection: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        borderRadius: borderRadius.lg,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    summaryLabel: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
    },
    summaryValue: {
        fontSize: fontSize.md,
        color: colors.text.primary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.sm,
    },
    totalLabel: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
    },
    totalValue: {
        fontSize: fontSize.xl,
        fontWeight: "700",
        color: colors.primary,
    },
    footer: {
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
