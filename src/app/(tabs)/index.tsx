import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";

export default function HomeScreen() {
    const { theme, mode, toggleTheme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.lg,
        },
        title: {
            fontSize: theme.typography.fontSize["3xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
        },
        subtitle: {
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.sm,
        },
        card: {
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.lg,
            marginTop: theme.spacing.xl,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        cardTitle: {
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
        },
        cardDescription: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.sm,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ServiceHub</Text>

            <Text style={styles.subtitle}>
                One app. Many services. Easy booking.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Find your next service</Text>

                <Text style={styles.cardDescription}>
                    Discover professionals and book services easily.
                </Text>
            </View>

            <Button
                title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
                onPress={toggleTheme}
            />

        </SafeAreaView>
    );
}