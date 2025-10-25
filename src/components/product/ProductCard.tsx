import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../constants";
import { Product } from "../../types";
import ThemedImage from "../themed-image";

interface ProductCardProps {
    product: Product;
    onPress: () => void;
    onAddToCart: () => void;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - spacing.md * 3) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onPress,
    onAddToCart,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <ThemedImage source={product.image} />
                {product.discount && product.discount > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                            -{product.discount}%
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>
                    {product.name}
                </Text>
                <Text style={styles.weight}>
                    {product.weight}/{product.unit}
                </Text>

                <View style={styles.footer}>
                    <View>
                        <Text style={styles.price}>
                            ${product.price.toFixed(2)}
                        </Text>
                        {product.originalPrice && (
                            <Text style={styles.originalPrice}>
                                ${product.originalPrice.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                    >
                        <Ionicons name="add" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: cardWidth * 0.8,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        overflow: "hidden",
    },
    discountBadge: {
        position: "absolute",
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    discountText: {
        color: colors.white,
        fontSize: fontSize.xs,
        fontWeight: "700",
    },
    content: {
        padding: spacing.sm,
    },
    name: {
        fontSize: fontSize.sm,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    weight: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        marginBottom: spacing.sm,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.primary,
    },
    originalPrice: {
        fontSize: fontSize.xs,
        color: colors.text.tertiary,
        textDecorationLine: "line-through",
    },
    addButton: {
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
});
