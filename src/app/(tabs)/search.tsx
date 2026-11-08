import { View, Text, StyleSheet } from "react-native";

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Screen</Text>
            <Text>Search Screen</Text>
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