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
import { useProfileStore, DeliveryAddress } from "../../src/store";

export default function DeliveryAddressesScreen() {
    const router = useRouter();
    const { addresses, deleteAddress, setDefaultAddress } = useProfileStore();

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteAddress(id),
                },
            ]
        );
    };

    const handleSetDefault = (id: string) => {
        setDefaultAddress(id);
    };

    const handleEdit = (address: DeliveryAddress) => {
        router.push({
            pathname: "/profile/address-form",
            params: { id: address.id, mode: "edit" },
        });
    };

    const handleAddNew = () => {
        router.push({
            pathname: "/profile/address-form",
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
                <Text style={styles.headerTitle}>Delivery Addresses</Text>
                <TouchableOpacity onPress={handleAddNew}>
                    <Ionicons name="add" size={28} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {addresses.map((address) => (
                    <View key={address.id} style={styles.addressCard}>
                        <View style={styles.addressHeader}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{address.label}</Text>
                                {address.isDefault && (
                                    <View style={styles.defaultBadge}>
                                        <Text style={styles.defaultText}>Default</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    onPress={() => handleEdit(address)}
                                    style={styles.actionButton}
                                >
                                    <Ionicons
                                        name="create-outline"
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDelete(address.id)}
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

                        <Text style={styles.name}>{address.name}</Text>
                        <Text style={styles.phone}>{address.phone}</Text>
                        <Text style={styles.address}>{address.address}</Text>

                        {!address.isDefault && (
                            <TouchableOpacity
                                style={styles.setDefaultButton}
                                onPress={() => handleSetDefault(address.id)}
                            >
                                <Text style={styles.setDefaultText}>
                                    Set as Default
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                {addresses.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="location-outline"
                            size={60}
                            color={colors.gray[300]}
                        />
                        <Text style={styles.emptyText}>No addresses yet</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddNew}
                        >
                            <Text style={styles.addButtonText}>Add Address</Text>
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
    addressCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    addressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    label: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.text.primary,
    },
    defaultBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    defaultText: {
        fontSize: fontSize.xs,
        color: colors.white,
        fontWeight: "600",
    },
    actions: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    actionButton: {
        padding: spacing.xs,
    },
    name: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    phone: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    address: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
        marginBottom: spacing.sm,
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
