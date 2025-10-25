import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../constants";
import { CartItem as CartItemType } from "../../types";
import ThemedImage from "../themed-image";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onToggleSelect: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onToggleSelect,
}) => {
    const { product, quantity, selected } = item;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={onToggleSelect}
                activeOpacity={0.7}
            >
                <View
                    style={[
                        styles.checkboxInner,
                        selected && styles.checkboxSelected,
                    ]}
                >
                    {selected && (
                        <Ionicons
                            name="checkmark"
                            size={16}
                            color={colors.white}
                        />
                    )}
                </View>
            </TouchableOpacity>

            <ThemedImage source={product.image} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>
                    {product.name}
                </Text>
                <Text style={styles.weight}>
                    {product.weight}/{product.unit}
                </Text>

                {product.discount && product.discount > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                            -{product.discount}%
                        </Text>
                        <Text style={styles.originalPrice}>
                            ${product.originalPrice?.toFixed(2)}
                        </Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                    </Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => onUpdateQuantity(quantity - 1)}
                        >
                            <Ionicons
                                name="remove"
                                size={16}
                                color={colors.primary}
                            />
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{quantity}</Text>

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => onUpdateQuantity(quantity + 1)}
                        >
                            <Ionicons
                                name="add"
                                size={16}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        marginRight: spacing.sm,
        justifyContent: "center",
    },
    checkboxInner: {
        width: 24,
        height: 24,
        borderRadius: borderRadius.sm,
        borderWidth: 2,
        borderColor: colors.gray[300],
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    weight: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
    },
    discountBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    discountText: {
        fontSize: fontSize.xs,
        fontWeight: "700",
        color: colors.white,
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    originalPrice: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        textDecorationLine: "line-through",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    quantity: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
        minWidth: 24,
        textAlign: "center",
    },
});
