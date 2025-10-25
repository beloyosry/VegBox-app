import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../../constants";
import { Category } from "../../types";
import ThemedImage from "../themed-image";

interface CategoryCardProps {
    category: Category;
    onPress: () => void;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - spacing.md * 3) / 2;

export const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: category.color }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <ThemedImage source={category.image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{category.name}</Text>
                <Text style={styles.count}>
                    {category.productCount} products
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        height: cardWidth * 0.9,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
        overflow: "hidden",
        padding: spacing.md,
        justifyContent: "space-between",
    },
    image: {
        width: cardWidth * 0.5,
        height: cardWidth * 0.5,
        resizeMode: "contain",
        alignSelf: "flex-end",
    },
    content: {
        gap: spacing.xs,
    },
    name: {
        fontSize: fontSize.md,
        fontWeight: "700",
        color: colors.text.primary,
    },
    count: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
});
