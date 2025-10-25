import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../constants";
import { DeliveryAddress, useProfileStore } from "../store";

interface AddressSelectorProps {
    onAddressChange?: (address: DeliveryAddress) => void;
}

export default function AddressSelector({
    onAddressChange,
}: AddressSelectorProps) {
    const { addresses, setDefaultAddress } = useProfileStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const defaultAddress = addresses.find((addr) => addr.isDefault);
    const currentAddress = defaultAddress || addresses[0];

    const handleSelectAddress = (address: DeliveryAddress) => {
        setDefaultAddress(address.id);
        setIsModalVisible(false);
        onAddressChange?.(address);
    };

    const getShortAddress = (address: DeliveryAddress) => {
        // Extract just the label or first part of address
        return address.label || address.address.split(",")[0];
    };

    if (!currentAddress) {
        return (
            <View>
                <Text style={styles.deliverText}>Deliver to</Text>
                <TouchableOpacity
                    style={styles.locationRow}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Ionicons
                        name="location"
                        size={16}
                        color={colors.primary}
                    />
                    <Text style={styles.locationText}>Select Address</Text>
                    <Ionicons
                        name="chevron-down"
                        size={16}
                        color={colors.text.primary}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <>
            <View>
                <Text style={styles.deliverText}>Deliver to</Text>
                <TouchableOpacity
                    style={styles.locationRow}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Ionicons
                        name="location"
                        size={16}
                        color={colors.primary}
                    />
                    <Text style={styles.locationText}>
                        {getShortAddress(currentAddress)}
                    </Text>
                    <Ionicons
                        name="chevron-down"
                        size={16}
                        color={colors.text.primary}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={false}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Select Delivery Address
                            </Text>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={colors.text.primary}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.addressList}>
                            {addresses.map((address) => (
                                <TouchableOpacity
                                    key={address.id}
                                    style={[
                                        styles.addressItem,
                                        address.id === currentAddress.id &&
                                            styles.addressItemActive,
                                    ]}
                                    onPress={() => handleSelectAddress(address)}
                                >
                                    <View style={styles.addressItemContent}>
                                        <View style={styles.addressItemHeader}>
                                            <View style={styles.labelContainer}>
                                                <Ionicons
                                                    name="location"
                                                    size={20}
                                                    color={
                                                        address.id ===
                                                        currentAddress.id
                                                            ? colors.primary
                                                            : colors.text
                                                                  .secondary
                                                    }
                                                />
                                                <Text
                                                    style={[
                                                        styles.addressLabel,
                                                        address.id ===
                                                            currentAddress.id &&
                                                            styles.addressLabelActive,
                                                    ]}
                                                >
                                                    {address.label}
                                                </Text>
                                            </View>
                                            {address.id ===
                                                currentAddress.id && (
                                                <Ionicons
                                                    name="checkmark-circle"
                                                    size={24}
                                                    color={colors.primary}
                                                />
                                            )}
                                        </View>
                                        <Text style={styles.addressName}>
                                            {address.name}
                                        </Text>
                                        <Text style={styles.addressText}>
                                            {address.address}
                                        </Text>
                                        <Text style={styles.addressPhone}>
                                            {address.phone}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    deliverText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    locationText: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.white,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    modalTitle: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
    },
    closeButton: {
        padding: spacing.xs,
    },
    addressList: {
        padding: spacing.md,
    },
    addressItem: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 2,
        borderColor: colors.border,
    },
    addressItemActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },
    addressItemContent: {
        gap: spacing.xs,
    },
    addressItemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.xs,
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    addressLabel: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.text.primary,
    },
    addressLabelActive: {
        color: colors.primary,
    },
    addressName: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    addressText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        lineHeight: 20,
    },
    addressPhone: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
});
