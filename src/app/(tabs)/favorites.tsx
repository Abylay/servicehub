import { View, Text, StyleSheet } from "react-native";

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites Screen</Text>
            <Text>Favorites Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
    },
});