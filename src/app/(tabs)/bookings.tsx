import { View, Text, StyleSheet } from "react-native";

export default function BookingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bookings Screen</Text>
            <Text>Bookings Screen</Text>
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