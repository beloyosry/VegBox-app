import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Button } from "../../src/components/ui";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useProfileStore } from "../../src/store";

export default function AddressFormScreen() {
    const router = useRouter();
    const { id, mode } = useLocalSearchParams();
    const { addresses, addAddress, updateAddress } = useProfileStore();

    const existingAddress = addresses.find((addr) => addr.id === id);
    const isEditMode = mode === "edit";

    const [label, setLabel] = useState(existingAddress?.label || "");
    const [name, setName] = useState(existingAddress?.name || "");
    const [phone, setPhone] = useState(existingAddress?.phone || "");
    const [address, setAddress] = useState(existingAddress?.address || "");

    const handleSave = () => {
        if (!label.trim() || !name.trim() || !phone.trim() || !address.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (isEditMode && id) {
            updateAddress(id as string, { label, name, phone, address });
            Alert.alert("Success", "Address updated successfully", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } else {
            addAddress({
                label,
                name,
                phone,
                address,
                isDefault: addresses.length === 0,
            });
            Alert.alert("Success", "Address added successfully", [
                { text: "OK", onPress: () => router.back() },
            ]);
        }
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
                <Text style={styles.headerTitle}>
                    {isEditMode ? "Edit Address" : "Add Address"}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Label</Text>
                        <TextInput
                            style={styles.input}
                            value={label}
                            onChangeText={setLabel}
                            placeholder="e.g., Home, Office, etc."
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Recipient Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter recipient name"
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Address</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter full address"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={isEditMode ? "Update Address" : "Add Address"}
                    onPress={handleSave}
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
    form: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginTop: spacing.md,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: fontSize.sm,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.gray[50],
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSize.md,
        color: colors.text.primary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    textArea: {
        minHeight: 100,
    },
    footer: {
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
