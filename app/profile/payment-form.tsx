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
import { useProfileStore, PaymentMethod } from "../../src/store";

export default function PaymentFormScreen() {
    const router = useRouter();
    const { id, mode } = useLocalSearchParams();
    const { paymentMethods, addPaymentMethod, updatePaymentMethod } = useProfileStore();

    const existingMethod = paymentMethods.find((pm) => pm.id === id);
    const isEditMode = mode === "edit";

    const [type, setType] = useState<PaymentMethod["type"]>(
        existingMethod?.type || "card"
    );
    const [name, setName] = useState(existingMethod?.name || "");
    const [details, setDetails] = useState(existingMethod?.details || "");

    const handleSave = () => {
        if (!name.trim() || !details.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (isEditMode && id) {
            updatePaymentMethod(id as string, { type, name, details });
            Alert.alert("Success", "Payment method updated successfully", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } else {
            addPaymentMethod({
                type,
                name,
                details,
                isDefault: paymentMethods.length === 0,
            });
            Alert.alert("Success", "Payment method added successfully", [
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
                    {isEditMode ? "Edit Payment" : "Add Payment"}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Payment Type</Text>
                        <View style={styles.typeSelector}>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    type === "card" && styles.typeButtonActive,
                                ]}
                                onPress={() => setType("card")}
                            >
                                <Ionicons
                                    name="card-outline"
                                    size={24}
                                    color={type === "card" ? colors.white : colors.text.primary}
                                />
                                <Text
                                    style={[
                                        styles.typeText,
                                        type === "card" && styles.typeTextActive,
                                    ]}
                                >
                                    Card
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    type === "bank" && styles.typeButtonActive,
                                ]}
                                onPress={() => setType("bank")}
                            >
                                <Ionicons
                                    name="business-outline"
                                    size={24}
                                    color={type === "bank" ? colors.white : colors.text.primary}
                                />
                                <Text
                                    style={[
                                        styles.typeText,
                                        type === "bank" && styles.typeTextActive,
                                    ]}
                                >
                                    Bank
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    type === "ewallet" && styles.typeButtonActive,
                                ]}
                                onPress={() => setType("ewallet")}
                            >
                                <Ionicons
                                    name="wallet-outline"
                                    size={24}
                                    color={type === "ewallet" ? colors.white : colors.text.primary}
                                />
                                <Text
                                    style={[
                                        styles.typeText,
                                        type === "ewallet" && styles.typeTextActive,
                                    ]}
                                >
                                    E-Wallet
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Payment Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="e.g., BCA Virtual Account"
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Details</Text>
                        <TextInput
                            style={styles.input}
                            value={details}
                            onChangeText={setDetails}
                            placeholder="e.g., **** **** **** 1234"
                            placeholderTextColor={colors.text.tertiary}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={isEditMode ? "Update Payment" : "Add Payment"}
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
    typeSelector: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    typeButton: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.white,
    },
    typeButtonActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    typeText: {
        fontSize: fontSize.sm,
        color: colors.text.primary,
        marginTop: spacing.xs,
        fontWeight: "600",
    },
    typeTextActive: {
        color: colors.white,
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
    footer: {
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
