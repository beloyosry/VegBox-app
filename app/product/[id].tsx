import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ThemedImage from "../../src/components/themed-image";
import { Button } from "../../src/components/ui";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useProduct } from "../../src/hooks/useProducts";
import { useCartStore } from "../../src/store";

export default function ProductDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const { data: product, isLoading } = useProduct(id as string);

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addItem(product);
            }
            router.back();
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.text.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => router.push("/(tabs)/cart")}
                >
                    <Ionicons
                        name="cart-outline"
                        size={24}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.imageContainer}>
                    <ThemedImage source={product.image} style={styles.image} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.weight}>
                        {product.weight}/{product.unit}
                    </Text>

                    <View style={styles.priceContainer}>
                        {product.discount && product.discount > 0 && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>
                                    {product.discount}%
                                </Text>
                            </View>
                        )}
                        <Text style={styles.price}>
                            ${product.price.toFixed(2)}
                        </Text>
                        {product.originalPrice && (
                            <Text style={styles.originalPrice}>
                                ${product.originalPrice.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    {(product.origin ||
                        product.condition ||
                        product.fatContent) && (
                        <View style={styles.attributesContainer}>
                            {product.origin && (
                                <View style={styles.attribute}>
                                    <Text style={styles.attributeLabel}>
                                        Origin
                                    </Text>
                                    <Text style={styles.attributeValue}>
                                        {product.origin}
                                    </Text>
                                </View>
                            )}
                            {product.condition && (
                                <View style={styles.attribute}>
                                    <Text style={styles.attributeLabel}>
                                        Condition
                                    </Text>
                                    <Text style={styles.attributeValue}>
                                        {product.condition}
                                    </Text>
                                </View>
                            )}
                            {product.fatContent && (
                                <View style={styles.attribute}>
                                    <Text style={styles.attributeLabel}>
                                        Fat content
                                    </Text>
                                    <Text style={styles.attributeValue}>
                                        {product.fatContent}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </View>

                    <View style={styles.quantitySection}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                            >
                                <Ionicons
                                    name="remove"
                                    size={20}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity
                                style={[
                                    styles.quantityButton,
                                    styles.quantityButtonActive,
                                ]}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Ionicons
                                    name="add"
                                    size={20}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.addButton}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        zIndex: 10,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        height: 300,
        backgroundColor: colors.gray[100],
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    content: {
        padding: spacing.md,
    },
    name: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    weight: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginBottom: spacing.md,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    discountBadge: {
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    discountText: {
        fontSize: fontSize.sm,
        fontWeight: "700",
        color: colors.white,
    },
    price: {
        fontSize: fontSize.xxxl,
        fontWeight: "700",
        color: colors.primary,
    },
    originalPrice: {
        fontSize: fontSize.lg,
        color: colors.text.tertiary,
        textDecorationLine: "line-through",
    },
    attributesContainer: {
        flexDirection: "row",
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    attribute: {
        flex: 1,
        backgroundColor: colors.gray[50],
        padding: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: "center",
    },
    attributeLabel: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    attributeValue: {
        fontSize: fontSize.sm,
        fontWeight: "600",
        color: colors.text.primary,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        lineHeight: 24,
    },
    quantitySection: {
        marginBottom: spacing.xl,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.lg,
    },
    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButtonActive: {
        backgroundColor: colors.primary,
    },
    quantity: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        minWidth: 40,
        textAlign: "center",
    },
    footer: {
        padding: spacing.md,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    addButton: {
        width: "100%",
    },
});
