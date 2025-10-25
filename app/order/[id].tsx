import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedImage from "../../src/components/themed-image";
import { OrderDetailSkeleton } from "../../src/components/ui";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useOrder } from "../../src/hooks/useOrders";
import { useProfileStore } from "../../src/store";

export default function OrderDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: order, isLoading, isFetching, refetch } = useOrder(id as string);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { profile, addresses, paymentMethods } = useProfileStore();

    // Get default address and payment method
    const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0];
    const defaultPayment = paymentMethods.find((pm) => pm.isDefault) || paymentMethods[0];

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.error("Error refreshing order:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "#F59E0B";
            case "processing":
                return "#3B82F6";
            case "completed":
                return "#10B981";
            case "cancelled":
                return "#EF4444";
            default:
                return colors.gray[400];
        }
    };

    const getStatusText = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
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
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <View style={{ width: 40 }} />
                </View>
                <OrderDetailSkeleton />
            </View>
        );
    }

    if (!order) {
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
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Order not found</Text>
                </View>
            </View>
        );
    }

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

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
                <Text style={styles.headerTitle}>Order Details</Text>
                <View style={{ width: 40 }} />
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
                {isRefreshing || isFetching ? (
                    <OrderDetailSkeleton />
                ) : (
                    <>
                        {/* Order Info Card */}
                        <View style={styles.card}>
                    <View style={styles.orderHeader}>
                        <View>
                            <Text style={styles.orderId}>{order.id}</Text>
                            <Text style={styles.orderDate}>
                                {formatDate(order.createdAt)}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor:
                                        getStatusColor(order.status) + "20",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: getStatusColor(order.status) },
                                ]}
                            >
                                {getStatusText(order.status)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="cart-outline"
                            size={20}
                            color={colors.text.secondary}
                        />
                        <Text style={styles.infoText}>
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                        </Text>
                    </View>
                </View>

                {/* Items List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.itemCard}>
                            <View style={styles.itemImage}>
                                <ThemedImage
                                    source={item.product.image}
                                    style={styles.productImage}
                                />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>
                                    {item.product.name}
                                </Text>
                                <Text style={styles.itemWeight}>
                                    {item.product.weight}/{item.product.unit}
                                </Text>
                                <View style={styles.itemFooter}>
                                    <Text style={styles.itemQuantity}>
                                        Qty: {item.quantity}
                                    </Text>
                                    <Text style={styles.itemPrice}>
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Delivery Address */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    {defaultAddress ? (
                        <>
                            <View style={styles.addressHeader}>
                                <View style={styles.addressLabelContainer}>
                                    <Ionicons
                                        name="location"
                                        size={20}
                                        color={colors.primary}
                                    />
                                    <Text style={styles.addressLabel}>
                                        {defaultAddress.label}
                                    </Text>
                                </View>
                                {defaultAddress.isDefault && (
                                    <View style={styles.defaultBadge}>
                                        <Text style={styles.defaultText}>Default</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.addressName}>{defaultAddress.name}</Text>
                            <Text style={styles.addressText}>{defaultAddress.address}</Text>
                            <Text style={styles.addressPhone}>{defaultAddress.phone}</Text>
                        </>
                    ) : (
                        <Text style={styles.noDataText}>No delivery address</Text>
                    )}
                </View>

                {/* Payment Method */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    {defaultPayment ? (
                        <View style={styles.paymentInfo}>
                            <View style={styles.paymentIconContainer}>
                                <Ionicons
                                    name={
                                        defaultPayment.type === "card"
                                            ? "card"
                                            : defaultPayment.type === "bank"
                                            ? "business"
                                            : "wallet"
                                    }
                                    size={24}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.paymentDetails}>
                                <Text style={styles.paymentName}>{defaultPayment.name}</Text>
                                <Text style={styles.paymentDetailsText}>{defaultPayment.details}</Text>
                            </View>
                            {defaultPayment.isDefault && (
                                <View style={styles.defaultBadge}>
                                    <Text style={styles.defaultText}>Default</Text>
                                </View>
                            )}
                        </View>
                    ) : (
                        <Text style={styles.noDataText}>Cash on Delivery</Text>
                    )}
                </View>

                {/* Customer Info */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Customer Information</Text>
                    <View style={styles.customerRow}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={colors.text.secondary}
                        />
                        <Text style={styles.customerText}>{profile.name}</Text>
                    </View>
                    <View style={styles.customerRow}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={colors.text.secondary}
                        />
                        <Text style={styles.customerText}>{profile.email}</Text>
                    </View>
                    {profile.phone && (
                        <View style={styles.customerRow}>
                            <Ionicons
                                name="call-outline"
                                size={20}
                                color={colors.text.secondary}
                            />
                            <Text style={styles.customerText}>{profile.phone}</Text>
                        </View>
                    )}
                </View>

                {/* Order Summary */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            ${order.total.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>$0.00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax (10%)</Text>
                        <Text style={styles.summaryValue}>
                            ${(order.total * 0.1).toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service Fee</Text>
                        <Text style={styles.summaryValue}>$5.00</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>
                            ${(order.total + order.total * 0.1 + 5).toFixed(2)}
                        </Text>
                    </View>
                </View>

                        <View style={{ height: 100 }} />
                    </>
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
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: fontSize.lg,
        color: colors.text.secondary,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        margin: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: spacing.md,
    },
    orderId: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    orderDate: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    statusText: {
        fontSize: fontSize.sm,
        fontWeight: "600",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    infoText: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
    },
    section: {
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        backgroundColor: colors.gray[100],
        overflow: "hidden",
        marginRight: spacing.md,
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    itemDetails: {
        flex: 1,
        justifyContent: "space-between",
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
    itemFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemQuantity: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    itemPrice: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.primary,
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
    addressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    addressLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    addressLabel: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.text.primary,
    },
    defaultBadge: {
        backgroundColor: colors.primary + "20",
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    defaultText: {
        fontSize: fontSize.xs,
        fontWeight: "600",
        color: colors.primary,
    },
    addressName: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    addressText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
        marginBottom: spacing.xs,
    },
    addressPhone: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    noDataText: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        fontStyle: "italic",
    },
    paymentInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    paymentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    paymentDetails: {
        flex: 1,
    },
    paymentName: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    paymentDetailsText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    customerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    customerText: {
        fontSize: fontSize.md,
        color: colors.text.primary,
    },
});
