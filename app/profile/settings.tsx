import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useProfileStore } from "../../src/store";

export default function SettingsScreen() {
    const router = useRouter();
    const { settings, updateSettings } = useProfileStore();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Push Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Receive push notifications
                            </Text>
                        </View>
                        <Switch
                            value={settings.notifications}
                            onValueChange={(value) =>
                                updateSettings({ notifications: value })
                            }
                            trackColor={{
                                false: colors.gray[300],
                                true: colors.primary,
                            }}
                            thumbColor={colors.white}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Email Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Receive email notifications
                            </Text>
                        </View>
                        <Switch
                            value={settings.emailNotifications}
                            onValueChange={(value) =>
                                updateSettings({ emailNotifications: value })
                            }
                            trackColor={{
                                false: colors.gray[300],
                                true: colors.primary,
                            }}
                            thumbColor={colors.white}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Order Updates</Text>
                            <Text style={styles.settingDescription}>
                                Get notified about order status
                            </Text>
                        </View>
                        <Switch
                            value={settings.orderUpdates}
                            onValueChange={(value) =>
                                updateSettings({ orderUpdates: value })
                            }
                            trackColor={{
                                false: colors.gray[300],
                                true: colors.primary,
                            }}
                            thumbColor={colors.white}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Promotions</Text>
                            <Text style={styles.settingDescription}>
                                Receive promotional offers
                            </Text>
                        </View>
                        <Switch
                            value={settings.promotions}
                            onValueChange={(value) =>
                                updateSettings({ promotions: value })
                            }
                            trackColor={{
                                false: colors.gray[300],
                                true: colors.primary,
                            }}
                            thumbColor={colors.white}
                        />
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Language</Text>
                            <Text style={styles.settingDescription}>
                                {settings.language}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Theme</Text>
                            <Text style={styles.settingDescription}>
                                {settings.theme.charAt(0).toUpperCase() +
                                    settings.theme.slice(1)}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Terms of Service</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Privacy Policy</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.text.tertiary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>App Version</Text>
                            <Text style={styles.settingDescription}>1.0.0</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    section: {
        backgroundColor: colors.white,
        marginTop: spacing.md,
        paddingVertical: spacing.sm,
    },
    sectionTitle: {
        fontSize: fontSize.sm,
        fontWeight: "700",
        color: colors.text.secondary,
        textTransform: "uppercase",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settingInfo: {
        flex: 1,
        marginRight: spacing.md,
    },
    settingLabel: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    settingDescription: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
});
