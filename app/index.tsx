import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { images } from "../src/constants";
import { useAuthStore } from "../src/store";

const WelcomeScreen = () => {
    const { user } = useAuthStore();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // Show splash for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <ImageBackground
                source={images.splashScreen}
                style={styles.container}
                resizeMode="cover"
            />
        );
    }

    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/login" />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});

export default WelcomeScreen;
