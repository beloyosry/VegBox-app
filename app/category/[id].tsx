import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CartCounter from "../../src/components/cart/CartCounter";
import { ProductCard } from "../../src/components/product";
import ThemedImage from "../../src/components/themed-image";
import { CategoryProductsSkeleton } from "../../src/components/ui";
import { borderRadius, colors, fontSize, spacing } from "../../src/constants";
import { useCategories, useProducts } from "../../src/hooks/useProducts";

export default function CategoryScreen() {
    const router = useRouter();
    const { id, name } = useLocalSearchParams();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { data: categories } = useCategories();
    const { data: products, isLoading, isFetching, refetch } = useProducts();

    const category = categories?.find((cat) => cat.id === id);
    const categoryProducts = products?.filter(
        (product) => product.category === id
    );

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.error("Error refreshing products:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleProductPress = (productId: string) => {
        router.push({
            pathname: "/product/[id]",
            params: { id: productId },
        });
    };

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
                <Text style={styles.headerTitle}>
                    {category?.name || (name as string) || "Category"}
                </Text>

                <CartCounter cartIcon={{ size: 20 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {/* Category Info */}
                {category && (
                    <View style={styles.categoryInfo}>
                        <View style={styles.categoryIconLarge}>
                            <ThemedImage
                                source={category.image}
                                style={styles.categoryImage}
                            />
                        </View>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.productCount}>
                            {categoryProducts?.length || 0} products
                        </Text>
                    </View>
                )}

                {/* Products Grid */}
                {isLoading || isFetching ? (
                    <CategoryProductsSkeleton />
                ) : categoryProducts && categoryProducts.length > 0 ? (
                    <View style={styles.productsGrid}>
                        {categoryProducts.map((product) => (
                            <View key={product.id} style={styles.productItem}>
                                <ProductCard
                                    product={product}
                                    onPress={() =>
                                        handleProductPress(product.id)
                                    }
                                    onAddToCart={() => {}}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="basket-outline"
                            size={80}
                            color={colors.gray[300]}
                        />
                        <Text style={styles.emptyTitle}>No products found</Text>
                        <Text style={styles.emptyText}>
                            There are no products in this category yet.
                        </Text>
                    </View>
                )}
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
    headerButton: {
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
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    categoryInfo: {
        alignItems: "center",
        paddingVertical: spacing.xl,
        backgroundColor: colors.white,
        marginBottom: spacing.md,
    },
    categoryIconLarge: {
        width: 100,
        height: 100,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    categoryImage: {
        width: 60,
        height: 60,
    },
    categoryName: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    productCount: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
    },
    productsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },
    productItem: {
        width: "47%",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.xxl * 2,
        paddingHorizontal: spacing.xl,
    },
    emptyTitle: {
        fontSize: fontSize.xl,
        fontWeight: "700",
        color: colors.text.primary,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: "center",
        lineHeight: 22,
    },
});
