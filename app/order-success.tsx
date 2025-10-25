import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedImage from "../src/components/themed-image";
import { Button } from "../src/components/ui";
import {
    borderRadius,
    colors,
    fontSize,
    images,
    spacing,
} from "../src/constants";
import { useCartStore, useProfileStore } from "../src/store";

export default function OrderSuccessScreen() {
    const router = useRouter();
    const { orderId, total } = useLocalSearchParams();
    const { clearSelectedItems } = useCartStore();
    const { profile, addresses, paymentMethods } = useProfileStore();

    // Get default address and payment method
    const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];
    const defaultPayment =
        paymentMethods.find((pm) => pm.isDefault) || paymentMethods[0];

    // Clear selected items when component mounts
    React.useEffect(() => {
        clearSelectedItems();
    }, [clearSelectedItems]);

    const handleBackToHome = () => {
        router.push("/(tabs)");
    };

    const handleTrackOrder = () => {
        router.push("/(tabs)/orders");
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Success Illustration */}
                <View style={styles.illustrationContainer}>
                    <ThemedImage
                        source={images.orderSuccess}
                        style={{ width: 200, height: 200 }}
                    />
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Your order is made!</Text>
                <Text style={styles.subtitle}>
                    Congratulations, your order has been successfully proceed,
                    we will deliver your order as soon as possible!
                </Text>

                {/* Order Details Card */}
                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Transaction ID</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        {orderId || `ORD${Date.now()}`}
                    </Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Recipient name</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        {defaultAddress?.name || profile.name}
                    </Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Address</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        {defaultAddress?.address || "No address provided"}
                    </Text>

                    {defaultAddress?.phone && (
                        <>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Phone</Text>
                            </View>
                            <Text style={styles.detailValue}>
                                {defaultAddress.phone}
                            </Text>
                        </>
                    )}

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment method</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        {defaultPayment?.name || "Cash on Delivery"}
                    </Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total amount</Text>
                    </View>
                    <Text style={styles.detailValue}>
                        ${typeof total === "string" ? total : "0.00"}
                    </Text>

                    <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>✓ Paid</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleBackToHome}
                >
                    <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
                <Button
                    title="Track Order"
                    onPress={handleTrackOrder}
                    style={styles.primaryButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: spacing.xxl,
        paddingHorizontal: spacing.md,
    },
    illustrationContainer: {
        alignItems: "center",
    },
    illustrationPlaceholder: {
        width: 200,
        height: 200,
        backgroundColor: colors.primaryLight,
        borderRadius: borderRadius.xl,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: spacing.sm,
    },
    illustrationEmoji: {
        fontSize: 60,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        textAlign: "center",
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: "center",
        lineHeight: 22,
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    detailsCard: {
        backgroundColor: colors.gray[50],
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.xl,
    },
    detailRow: {
        marginTop: spacing.md,
    },
    detailLabel: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    detailValue: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    statusLabel: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    statusBadge: {
        backgroundColor: colors.primary + "20",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    statusText: {
        fontSize: fontSize.sm,
        fontWeight: "600",
        color: colors.primary,
    },
    footer: {
        flexDirection: "row",
        gap: spacing.sm,
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: colors.primaryLight,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryButtonText: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.primary,
    },
    primaryButton: {
        flex: 1,
    },
});
