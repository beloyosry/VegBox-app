import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useAuthStore } from "../../src/store";

export default function ProfileScreen() {
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => {
                    clearAuth();
                    router.replace("/login");
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={40}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={styles.name}>{user?.name || "Guest"}</Text>
                    <Text style={styles.email}>{user?.email || ""}</Text>
                </View>

                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color={colors.text.primary}
                        />
                        <Text style={styles.menuText}>Edit Profile</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color={colors.text.primary}
                        />
                        <Text style={styles.menuText}>Delivery Address</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color={colors.text.primary}
                        />
                        <Text style={styles.menuText}>Payment Methods</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color={colors.text.primary}
                        />
                        <Text style={styles.menuText}>Settings</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleLogout}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color={colors.error}
                        />
                        <Text
                            style={[styles.menuText, { color: colors.error }]}
                        >
                            Logout
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>
                </View>
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
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    profileCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    name: {
        fontSize: fontSize.xl,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    email: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    menuSection: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    menuText: {
        flex: 1,
        fontSize: fontSize.md,
        color: colors.text.primary,
        marginLeft: spacing.md,
    },
});
