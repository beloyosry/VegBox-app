import { router } from "expo-router";
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { colors, Icons } from "../../../src/constants";
import { useCartStore } from "../../../src/store";

const CartCounter = ({
    style,
    cartIcon,
}: {
    style?: StyleProp<ViewStyle>;
    cartIcon?: {
        size?: number;
        color?: string;
    };
}) => {
    const { CartIcon } = Icons();
    const cartItems = useCartStore((state) => state.items);

    return (
        <TouchableOpacity
            style={[styles.cart, style]}
            onPress={() => router.push("/(tabs)/cart")}
        >
            <CartIcon
                width={cartIcon?.size || 24}
                height={cartIcon?.size || 24}
                color={cartIcon?.color || colors.primary}
            />
            {cartItems.length > 0 && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        backgroundColor: colors.secondary,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: 10,
                            fontWeight: "700",
                        }}
                    >
                        {cartItems.length}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};
export default CartCounter;
const styles = StyleSheet.create({
    cart: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
