import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Input } from "../src/components/ui";
import {
    borderRadius,
    colors,
    fontSize,
    images,
    spacing,
} from "../src/constants";
import { useLogin } from "../src/hooks/useAuth";

export default function LoginScreen() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ phoneNumber: "", password: "" });

    const loginMutation = useLogin();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { phoneNumber: "", password: "" };

        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
            isValid = false;
        } else if (phoneNumber.length < 10) {
            newErrors.phoneNumber = "Phone number is invalid";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        // Convert phone number to email format for mock authentication
        loginMutation.mutate(
            { email: "test@test.com", password },
            {
                onSuccess: () => {
                    router.replace("/(tabs)");
                },
                onError: (error: any) => {
                    Alert.alert(
                        "Login Failed",
                        error.message || "Invalid credentials"
                    );
                },
            }
        );
    };

    return (
        <ImageBackground
            source={images.loginBackground}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.overlay} />

                <KeyboardAvoidingView
                    style={styles.contentContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.logoContainer}>
                            <Ionicons
                                name="cube"
                                size={32}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.welcomeText}>
                            Welcome to VegBox
                        </Text>
                        <Text style={styles.title}>
                            Login to your{"\n"}Account
                        </Text>

                        <View style={styles.tabContainer}>
                            <TouchableOpacity style={styles.tabActive}>
                                <Text style={styles.tabTextActive}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab}>
                                <Text style={styles.tabText}>Register</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.form}>
                            <Input
                                label="Phone number"
                                placeholder="012345678910"
                                value={phoneNumber}
                                onChangeText={(text) => {
                                    setPhoneNumber(text);
                                    setErrors({ ...errors, phoneNumber: "" });
                                }}
                                error={errors.phoneNumber}
                                icon="call"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                            />

                            <Input
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors({ ...errors, password: "" });
                                }}
                                error={errors.password}
                                icon="lock-closed"
                                isPassword
                            />

                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberMe}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            rememberMe &&
                                                styles.checkboxChecked,
                                        ]}
                                    >
                                        {rememberMe && (
                                            <Ionicons
                                                name="checkmark"
                                                size={14}
                                                color={colors.white}
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.rememberText}>
                                        Remember me
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text style={styles.forgotText}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                title="Login"
                                onPress={handleLogin}
                                loading={loginMutation.isPending}
                                style={styles.loginButton}
                            />

                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>
                                    Or login with
                                </Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons
                                        name="logo-google"
                                        size={20}
                                        color="#DB4437"
                                    />
                                    <Text style={styles.socialButtonText}>
                                        Google
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons
                                        name="logo-apple"
                                        size={20}
                                        color={colors.black}
                                    />
                                    <Text style={styles.socialButtonText}>
                                        Apple
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    By signing up, you agree to the{" "}
                                    <Text style={styles.link}>
                                        Terms of Service
                                    </Text>{" "}
                                    and{" "}
                                    <Text style={styles.link}>
                                        Data Processing Agreement
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingTop: spacing.xxl,
    },
    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    welcomeText: {
        fontSize: fontSize.sm,
        color: colors.gray[400],
        marginBottom: spacing.xs,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.lg,
        lineHeight: 40,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: colors.gray[100],
        borderRadius: borderRadius.md,
        padding: spacing.xs,
        marginBottom: spacing.lg,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: "center",
    },
    tabActive: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
    },
    tabText: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
    },
    tabTextActive: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    form: {
        marginTop: spacing.md,
    },
    optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    rememberMe: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: borderRadius.sm,
        borderWidth: 2,
        borderColor: colors.gray[300],
        marginRight: spacing.xs,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    rememberText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
    },
    forgotText: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: "600",
    },
    loginButton: {
        marginBottom: spacing.lg,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginHorizontal: spacing.md,
    },
    socialButtons: {
        flexDirection: "row",
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    socialButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    socialButtonText: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    footer: {
        alignItems: "center",
    },
    footerText: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        textAlign: "center",
        lineHeight: 18,
    },
    link: {
        color: colors.text.primary,
        fontWeight: "600",
    },
});
