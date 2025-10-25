import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ProductCard } from "../../src/components/product";
import ThemedImage from "../../src/components/themed-image";
import {
    borderRadius,
    colors,
    fontSize,
    images,
    spacing,
} from "../../src/constants";
import {
    useCategories,
    useFlashSaleProducts,
    useRecipes,
    useTodaySpecials,
} from "../../src/hooks/useProducts";
import { useCartStore } from "../../src/store";

export default function HomeScreen() {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);

    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const { data: flashSaleProducts, isLoading: flashSaleLoading } =
        useFlashSaleProducts();
    const { data: todaySpecials, isLoading: specialsLoading } =
        useTodaySpecials();
    const { data: recipes } = useRecipes();

    const handleAddToCart = (product: any) => {
        addItem(product);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Banner */}
                <View>
                    <ImageBackground
                        source={images.homeBackground}
                        style={styles.banner}
                    >
                        {/* Address */}
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.deliverText}>
                                    Deliver to
                                </Text>
                                <View style={styles.locationRow}>
                                    <Ionicons
                                        name="location"
                                        size={16}
                                        color={colors.primary}
                                    />
                                    <Text style={styles.locationText}>
                                        Dexter&apos;s Home
                                    </Text>
                                    <Ionicons
                                        name="chevron-down"
                                        size={16}
                                        color={colors.text.primary}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.notificationButton}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.bannerTitle}>
                            Pay Day{"\n"}Shop Day
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                            Voucher{"\n"}up to
                        </Text>
                        <Text style={styles.bannerDiscount}>75%</Text>

                        {/* White fade effect at bottom */}
                        <LinearGradient
                            colors={["transparent", colors.background]}
                            style={styles.bannerGradient}
                        />
                    </ImageBackground>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color={colors.gray[400]}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="What's your daily needs?"
                        placeholderTextColor={colors.gray[400]}
                    />
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/categories")}
                        >
                            <Text style={styles.seeAll}>See all →</Text>
                        </TouchableOpacity>
                    </View>

                    {categoriesLoading ? (
                        <ActivityIndicator color={colors.primary} />
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesScroll}
                        >
                            {categories?.slice(0, 6).map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryItem}
                                    onPress={() => router.push(`/categories`)}
                                >
                                    <View style={[styles.categoryIcon]}>
                                        <ThemedImage
                                            source={category.image}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.categoryName}>
                                        {category.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Flash Sale */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Flash sale 🔥</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See all →</Text>
                        </TouchableOpacity>
                    </View>

                    {flashSaleLoading ? (
                        <ActivityIndicator color={colors.primary} />
                    ) : (
                        <FlatList
                            data={flashSaleProducts?.slice(0, 4)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.productsScroll}
                            renderItem={({ item }) => (
                                <View style={styles.productCardWrapper}>
                                    <ProductCard
                                        product={item}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/product/[id]",
                                                params: { id: item.id },
                                            })
                                        }
                                        onAddToCart={() =>
                                            handleAddToCart(item)
                                        }
                                    />
                                </View>
                            )}
                        />
                    )}
                </View>

                {/* Today's Specials */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Today&apos;s specials
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See all →</Text>
                        </TouchableOpacity>
                    </View>

                    {specialsLoading ? (
                        <ActivityIndicator color={colors.primary} />
                    ) : (
                        <FlatList
                            data={todaySpecials?.slice(0, 4)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.productsScroll}
                            renderItem={({ item }) => (
                                <View style={styles.productCardWrapper}>
                                    <ProductCard
                                        product={item}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/product/[id]",
                                                params: { id: item.id },
                                            })
                                        }
                                        onAddToCart={() =>
                                            handleAddToCart(item)
                                        }
                                    />
                                </View>
                            )}
                        />
                    )}
                </View>

                {/* Your daily inspiration */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Your daily inspiration
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See all →</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recipesScroll}
                    >
                        {recipes?.map((recipe) => (
                            <TouchableOpacity
                                key={recipe.id}
                                style={styles.recipeCard}
                            >
                                <View
                                    style={{
                                        backgroundColor: colors.gray[50],
                                        flexDirection: "row",
                                        padding: spacing.xs,
                                        borderRadius: borderRadius.xl,
                                    }}
                                >
                                    <View style={styles.recipeInfo}>
                                        <Text
                                            style={styles.recipeName}
                                            numberOfLines={2}
                                        >
                                            {recipe.name}
                                        </Text>
                                        <Text style={styles.recipeTime}>
                                            <Ionicons
                                                name="time-outline"
                                                size={14}
                                                color={colors.text.secondary}
                                            />{" "}
                                            {recipe.prepTime} mins
                                        </Text>
                                    </View>
                                    <View style={styles.recipeImage}>
                                        <ThemedImage source={recipe.image} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 100 }} />
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
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
    },
    deliverText: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    locationText: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.text.primary,
    },
    notificationButton: {
        padding: spacing.xs,
    },
    scrollView: {
        flex: 1,
    },
    banner: {
        backgroundColor: colors.primaryLight,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        minHeight: 150,
        overflow: "hidden",
    },
    bannerGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    bannerTitle: {
        fontSize: fontSize.xxxl,
        fontWeight: "700",
        color: colors.primary,
        lineHeight: 38,
    },
    bannerSubtitle: {
        fontSize: fontSize.sm,
        color: colors.text.secondary,
        marginTop: spacing.xs,
    },
    bannerDiscount: {
        fontSize: fontSize.xxl,
        fontWeight: "700",
        color: colors.primary,
        marginTop: spacing.xs,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.sm,
        fontSize: fontSize.md,
        color: colors.text.primary,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: "700",
        color: colors.text.primary,
    },
    seeAll: {
        fontSize: fontSize.sm,
        color: colors.primary,
        fontWeight: "600",
    },
    categoriesScroll: {
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },
    categoryItem: {
        alignItems: "center",
        gap: spacing.xs,
    },
    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryLight,
    },
    categoryName: {
        fontSize: fontSize.xs,
        color: colors.text.primary,
        fontWeight: "500",
    },
    productsScroll: {
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },
    productCardWrapper: {
        marginRight: spacing.sm,
    },
    recipesScroll: {
        padding: spacing.md,
        gap: spacing.md,
    },
    recipeCard: {
        width: 200,
        height: 120,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        overflow: "hidden",
        marginRight: spacing.md,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    recipeImage: {
        width: 90,
        height: 90,
        borderRadius: borderRadius.full,
        overflow: "hidden",
    },
    recipeInfo: {
        flex: 1,
        justifyContent: "center",
        paddingRight: spacing.sm,
    },
    recipeName: {
        fontSize: fontSize.md,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: spacing.sm,
        lineHeight: 20,
    },
    recipeTime: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        fontWeight: "500",
    },
});
