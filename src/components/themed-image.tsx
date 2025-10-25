import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
} from "react-native";
const ThemedImage = ({
    source,
    style,
}: {
    source: string | ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}) => {
    return (
        <Image
            source={typeof source === "string" ? { uri: source } : source}
            style={[styles.base, style]}
        />
    );
};
export default ThemedImage;
const styles = StyleSheet.create({
    base: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
