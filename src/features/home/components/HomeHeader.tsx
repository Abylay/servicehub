import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import { Avatar } from "@/components/ui/Avatar";

export function HomeHeader() {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        greeting: {
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        title: {
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
            marginTop: theme.spacing.xs,
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Good morning, Alex</Text>
                <Text style={styles.title}>Find your service</Text>
            </View>

            <Avatar name="Alex Morgan" size="lg" />
        </View>
    );
}