import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useProfileStore, PaymentMethod } from "../../src/store";

export default function PaymentMethodsScreen() {
    const router = useRouter();
    const { paymentMethods, deletePaymentMethod, setDefaultPaymentMethod } =
        useProfileStore();

    const getPaymentIcon = (type: PaymentMethod["type"]) => {
        switch (type) {
            case "card":
                return "card-outline";
            case "bank":
                return "business-outline";
            case "ewallet":
                return "wallet-outline";
            default:
                return "card-outline";
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Payment Method",
            "Are you sure you want to delete this payment method?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deletePaymentMethod(id),
                },
            ]
        );
    };

    const handleSetDefault = (id: string) => {
        setDefaultPaymentMethod(id);
    };

    const handleEdit = (method: PaymentMethod) => {
        router.push({
            pathname: "/profile/payment-form",
            params: { id: method.id, mode: "edit" },
        });
    };

    const handleAddNew = () => {
        router.push({
            pathname: "/profile/payment-form",
            params: { mode: "add" },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <TouchableOpacity onPress={handleAddNew}>
                    <Ionicons name="add" size={28} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {paymentMethods.map((method) => (
                    <View key={method.id} style={styles.paymentCard}>
                        <View style={styles.paymentHeader}>
                            <View style={styles.paymentInfo}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name={getPaymentIcon(method.type)}
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentName}>{method.name}</Text>
                                    <Text style={styles.paymentDetailsText}>
                                        {method.details}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    onPress={() => handleEdit(method)}
                                    style={styles.actionButton}
                                >
                                    <Ionicons
                                        name="create-outline"
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDelete(method.id)}
                                    style={styles.actionButton}
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={20}
                                        color={colors.error}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {method.isDefault ? (
                            <View style={styles.defaultBadge}>
                                <Text style={styles.defaultText}>Default</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.setDefaultButton}
                                onPress={() => handleSetDefault(method.id)}
                            >
                                <Text style={styles.setDefaultText}>
                                    Set as Default
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                {paymentMethods.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="card-outline"
                            size={60}
                            color={colors.gray[300]}
                        />
                        <Text style={styles.emptyText}>No payment methods yet</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddNew}
                        >
                            <Text style={styles.addButtonText}>
                                Add Payment Method
                            </Text>
                        </TouchableOpacity>
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
        padding: spacing.md,
    },
    paymentCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    paymentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    paymentInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.md,
    },
    paymentDetails: {
        flex: 1,
    },
    paymentName: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    paymentDetailsText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    actions: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    actionButton: {
        padding: spacing.xs,
    },
    defaultBadge: {
        alignSelf: "flex-start",
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        marginTop: spacing.xs,
    },
    defaultText: {
        fontSize: fontSize.xs,
        color: colors.white,
        fontWeight: "600",
    },
    setDefaultButton: {
        alignSelf: "flex-start",
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.primary,
        marginTop: spacing.xs,
    },
    setDefaultText: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: "600",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.xxl,
    },
    emptyText: {
        fontSize: fontSize.lg,
        color: colors.text.secondary,
        marginTop: spacing.md,
        marginBottom: spacing.lg,
    },
    addButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.md,
    },
    addButtonText: {
        fontSize: fontSize.md,
        color: colors.white,
        fontWeight: "600",
    },
});
